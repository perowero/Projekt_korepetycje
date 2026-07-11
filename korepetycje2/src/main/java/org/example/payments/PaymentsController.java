package org.example.payments;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import org.example.lesson.Lesson;
import org.example.lesson.LessonRepository;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentsController {
    private LessonRepository lessonRepository;

    public PaymentsController(LessonRepository lessonRepository){
        this.lessonRepository=lessonRepository;
    }

    @Value("${stripe.secret.key}")
    private String secretKey;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @PostMapping("/checkout/{lessonId}")
    public ResponseEntity<Map<String,String>> createCheckoutSession(@PathVariable long lessonId){
        Stripe.apiKey=secretKey;

        Lesson lesson=lessonRepository.findById(lessonId).orElse(null);

        try{
            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.BLIK)
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5173/paymentRedirect?success=true")
                    .setCancelUrl("http://localhost:5173/paymentRedirect?canceled=true")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("pln")
                                                    .setUnitAmount((long)(lesson.getPrize()*100))
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Korepetycje - lekcja #" + lesson.getId())
                                                                    .setDescription("Opłata za zajęcia")
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .putMetadata("lessonId", String.valueOf(lesson.getId()))
                    .build();

            Session session=Session.create(params);

            Map<String, String> responseData = new HashMap<>();
            responseData.put("checkoutUrl", session.getUrl());

            return ResponseEntity.ok(responseData);
        }catch (StripeException e) {
            System.err.println("Błąd Stripe: " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of("error", "Błąd generowania płatności"));
        }
    }
    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        System.out.println("📥 [WEBHOOK] Stripe właśnie przysłał powiadomienie!");
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            System.out.println("🔑 [WEBHOOK] Podpis zweryfikowany pomyślnie. Typ zdarzenia: " + event.getType());
        } catch (SignatureVerificationException e) {
            System.err.println("❌ [WEBHOOK] Niepoprawny podpis: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Błędny podpis");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            System.out.println("🎉 [WEBHOOK] Rozpoznano udaną płatność checkout.session.completed");

            try {
                EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                Session session = null;

                if (deserializer.getObject().isPresent()) {
                    session = (Session) deserializer.getObject().get();
                } else {
                    // Jeśli standardowe pobranie zawiodło, wymuszamy bezpieczną deserializację asynchroniczną
                    session = (Session) deserializer.deserializeUnsafe();
                }

                if (session != null) {
                    Map<String, String> metadata = session.getMetadata();

                    if (metadata != null && metadata.containsKey("lessonId")) {
                        long lessonId = Long.parseLong(metadata.get("lessonId"));
                        Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
                        if (lesson != null) {
                            ;
                            lesson.setPaid(true);
                            lessonRepository.save(lesson);
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Błąd podczas przetwarzania sesji: " + e.getMessage());
                e.printStackTrace();
            }
        }

        return ResponseEntity.ok("Odebrano");
    }
}
