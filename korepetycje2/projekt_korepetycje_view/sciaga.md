# 🚀 Ściągawka Tailwind CSS v4 — Projekt Korepetycje

Wszystkie wymiary w systemie Tailwind (np. `4`, `6`, `12`) są mnożone przez **4px**. 
Przykład: `p-4` oznacza `4 × 4px = 16px` paddingu.

---

## 1. Układ i Pozycjonowanie (Flexbox & Grid)
Używane do układania elementów obok siebie lub w pionowych kolumnach.

| Klasa | Odpowiednik CSS | Opis / Zastosowanie |
| :--- | :--- | :--- |
| `flex` | `display: flex;` | Aktywuje elastyczny układ w poziomie. |
| `flex-col` | `flex-direction: column;` | Układa elementy w pionie (idealne do formularzy). |
| `items-center` | `align-items: center;` | Środkuje elementy w pionie (np. ikona i tekst). |
| `justify-between`| `justify-content: space-between;` | Rozpycha elementy na boki (tekst w lewo, przycisk w prawo). |
| `justify-center` | `justify-content: center;` | Środkuje elementy w poziomie. |
| `gap-4` | `gap: 16px;` | Odstęp pomiędzy elementami wewnątrz flex/grid. |
| `space-y-3` | Marginesy pionowe dla dzieci | Automatyczny odstęp w pionie między elementami listy `<li>`. |

---

## 2. Odstępy (Marginesy i Paddingi)

| Klasa | Odpowiednik CSS | Zastosowanie |
| :--- | :--- | :--- |
| `p-4` | `padding: 16px;` | Odstęp wewnętrzny z każdej strony kontenera. |
| `px-6` | `padding-left/right: 24px;` | Odstęp wewnętrzny w poziomie (lewo/prawo). |
| `py-2` | `padding-top/bottom: 8px;` | Odstęp wewnętrzny w pionie (góra/dół). |
| `m-4` | `margin: 16px;` | Margines zewnętrzny z każdej strony. |
| `mb-6` | `margin-bottom: 24px;` | Odstęp pod elementem (np. pod nagłówkiem `<h1>`). |
| `mx-auto` | `margin-left/right: auto;` | Centruje całą kartę/formularz na środku ekranu. |

---

## 3. Nowoczesna Paleta Barw (Dark Mode Premium)
Dla profesjonalnego efektu używaj palety `slate`. Im wyższa cyfra ($50 \rightarrow 950$), tym ciemniejszy odcień.

* **Tło aplikacji (Główne):** `bg-slate-950` (głęboka, nowoczesna czerń) lub `bg-slate-900`.
* **Karty i Kontenery:** `bg-slate-800` lub `bg-slate-800/50` (ukośnik `/50` oznacza 50% przezroczystości).
* **Teksty:**
    * `text-white` — Czysta biel (nagłówki, ważne akcenty).
    * `text-slate-200` — Jasnoszary (standardowy tekst, idealny do czytania w dark mode).
    * `text-slate-400` — Ciemniejszy szary (pomocnicze opisy, daty, placeholdery).
* **Główne Przyciski (Akcenty):**
    * `bg-sky-600` — Jasnoniebieski (akcja domyślna, np. pobieranie).
    * `bg-emerald-600` — Zielony (sukces, np. "Zapisano plik").
    * `bg-indigo-600` — Modny fiolet (podkreślenie paneli).

---

## 4. Krawędzie, Cienie i Zaokrąglenia

| Klasa | Odpowiednik CSS | Opis / Zastosowanie |
| :--- | :--- | :--- |
| `rounded-lg` | `border-radius: 8px;` | Standardowe zaokrąglenie dla przycisków i inputów. |
| `rounded-2xl` | `border-radius: 16px;` | Duże zaokrąglenie dla całych kart i formularzy. |
| `border` | `border: 1px solid;` | Włącza cienką ramkę wokół elementu. |
| `border-slate-800`| Kolor ramki | Subtelna, ciemna krawędź — świetnie odcina karty od tła. |
| `shadow-xl` | Głęboki cień | Sprawia, że karta wizualnie "lewituje" nad tłem aplikacji. |

---

## 5. Szerokość i Typografia

* **Szerokość kart:** `max-w-md` (mały formularz, $448px$), `max-w-2xl` (średni panel, $672px$), `max-w-4xl` (szeroka lista, $896px$).
* **Wymiary pełne:** `w-full` (`width: 100%`), `h-screen` (`height: 100vh` — wysokość całego okna).
* **Wielkość tekstu:** `text-xs` (mały druczek), `text-sm` (standardowy tekst), `text-lg` (podtytuły), `text-2xl` (duży nagłówek).
* **Grubość fontu:** `font-medium` (lekko pogrubiony), `font-bold` (mocny nagłówek).

---

## 6. Interakcje (Efekty Hover i Focus)
Dopisujesz je na początku innej klasy, rozdzielając dwukropkiem.

* `hover:bg-sky-500` — Zmień tło na jaśniejsze, gdy użytkownik najedzie myszką.
* `active:scale-95` — Delikatnie zmniejsz element podczas kliknięcia (efekt fizycznego wciskania przycisku).
* `focus:outline-none focus:ring-2 focus:ring-sky-500` — Gdy użytkownik kliknie wewnątrz inputa, podświetl jego ramkę na niebiesko.
* `transition-all duration-200` — **Dopisuj do każdego przycisku!** Zmienia chamskie przeskakiwanie kolorów w płynną, 200-milisekundową animację.

---

### 💡 Złota zasada budowania komponentu (Formularz / Karta)
Zawsze buduj elementy według tego schematu konstrukcyjnego:

```jsx
<div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-4">
  <h2 className="text-xl font-bold text-white">Tytuł Sekcji</h2>
  
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-slate-200">Etykieta pola</label>
    <input className="p-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
  </div>

  <button className="w-full py-3 bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white font-semibold rounded-lg transition-all duration-150 cursor-pointer">
    Zatwierdź akcję
  </button>
</div>