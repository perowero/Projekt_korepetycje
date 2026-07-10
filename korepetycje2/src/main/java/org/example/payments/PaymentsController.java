package org.example.payments;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.param.checkout.SessionCreateParams;
import org.example.lesson.Lesson;
import org.example.lesson.LessonRepository;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Value;
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
}
