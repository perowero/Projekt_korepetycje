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
          
         
          const dayLessons = cell.fullDate && Array.isArray(lessons)
            ? lessons.filter(lesson => {
                
                const lessonDateFull = lesson.data || lesson.date;
                if (!lessonDateFull) return false;

             
                const lessonDateShort = lessonDateFull.includes('T') 
                  ? lessonDateFull.split('T')[0] 
                  : lessonDateFull;

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
              
             
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '5px' }}>
                {dayLessons.map((lesson) => {
                  // Wyciągamy samą godzinę do wyświetlenia (np. "14:30")
                  const hour = lesson.data && lesson.data.includes('T')
                    ? lesson.data.split('T')[1].substring(0, 5)
                    : '';

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
                      title={`Lekcja o ${hour}`}
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