import { useState, useEffect } from "react";
import { ImportLessons } from "../operations/ImportLessons";

export const Calendary = () => {
  const formatDateLocal = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    const d = String(dateObj.getDate()).padStart(2, '0');     
    return `${y}-${m}-${d}`;
  };

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const startdate = formatDateLocal(new Date(year, month, 1));
  const enddate = formatDateLocal(new Date(year, month + 1, 0));
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    ImportLessons(startdate, enddate)
      .then((data) => {
        if (data) {
          console.log("lekcje dane", data);
          setLessons(data);
        }
      })
      .catch((err) => console.error("Błąd pobierania lekcji:", err));
  }, [startdate, enddate]);

  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  let startDayOfWeek = new Date(year, month, 1).getDay();
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const calendarCells = [];

  for (let i = 0; i < startDayOfWeek; i++) {
    calendarCells.push({ id: `blank-${i}`, dayNumber: "", fullDate: null });
  }

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const dayDate = formatDateLocal(new Date(year, month, day));

    calendarCells.push({
      id: dayDate,
      dayNumber: day,
      fullDate: dayDate
    });
  }

  return (
    <div className="calendar-container" style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Nagłówki dni tygodnia */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', fontWeight: 'bold', textAlign: 'center' }}>
        <div>Pn</div><div>Wt</div><div>Śr</div><div>Cz</div><div>Pt</div><div>Sb</div><div>Nd</div>
      </div>

      {/* Główna siatka kalendarza */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginTop: '10px' }}>
        {calendarCells.map((cell) => {
  // 1. FILTROWANIE LEKCJI DLA DANEGO DNIA
  const dayLessons = cell.fullDate && Array.isArray(lessons)
    ? lessons.filter(lesson => {
        if (!lesson.data) return false;

        let lessonDateShort = "";

        // Jeśli Spring przesłał datę jako String (np. "2026-07-06T14:30:00" lub "2026-07-06 14:30:00")
        if (typeof lesson.data === 'string') {
          lessonDateShort = lesson.data.includes('T') 
            ? lesson.data.split('T')[0] 
            : lesson.data.split(' ')[0];
        } 
        // Jeśli Spring przesłał datę jako tablicę liczb (np. [2026, 7, 6, 14, 30])
        else if (Array.isArray(lesson.data)) {
          const yearStr = lesson.data[0];
          const monthStr = String(lesson.data[1]).padStart(2, '0');
          const dayStr = String(lesson.data[2]).padStart(2, '0');
          lessonDateShort = `${yearStr}-${monthStr}-${dayStr}`;
        }

        // Porównujemy wyciągniętą datę z datą kafelka (np. "2026-07-06")
        return lessonDateShort === cell.fullDate;
      })
    : [];

  return (
    <div 
      key={cell.id} 
      style={{ 
        border: cell.dayNumber ? '1px solid #444' : 'none', 
        minHeight: '80px', 
        padding: '5px',
        backgroundColor: cell.dayNumber ? '#222' : 'transparent',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{cell.dayNumber}</div>
      
      {/* LISTA LEKCJI W DANYM DNIU */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '5px' }}>
        {dayLessons.map((lesson) => {
          let hour = "";

          // Bezpieczne wyciąganie godziny (String)
          if (typeof lesson.data === 'string' && lesson.data.includes('T')) {
            hour = lesson.data.split('T')[1].substring(0, 5);
          } else if (typeof lesson.data === 'string' && lesson.data.includes(' ')) {
            hour = lesson.data.split(' ')[1].substring(0, 5);
          }
          // Bezpieczne wyciąganie godziny (Tablica liczb [rr, mm, dd, gg, mm])
          else if (Array.isArray(lesson.data) && lesson.data.length >= 5) {
            const hStr = String(lesson.data[3]).padStart(2, '0');
            const mStr = String(lesson.data[4]).padStart(2, '0');
            hour = `${hStr}:${mStr}`;
          }

          return (
            <div 
            
              key={lesson.id} 
              style={{ 
                backgroundColor: '#0284c7', 
                fontSize: '9px', 
                padding: '2px', 
                borderRadius: '3px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
              title={`Lekcja o ${hour}, Cena: ${lesson.prize} zł`}
            >
              {hour ? `[${hour}] ` : ''} Lekcja #{lesson.id}
            </div>
          );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};