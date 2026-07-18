import { useState, useEffect } from "react";
import { ImportLessons } from "../operations/ImportLessons";
import { useNavigate } from "react-router-dom";

export const Calendary = () => {
  const navigate=useNavigate();
  const formatDateLocal = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    const d = String(dateObj.getDate()).padStart(2, '0');     
    return `${y}-${m}-${d}`;
  };

  const date = new Date();
  const [month,setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const startdate = formatDateLocal(new Date(year, month, 1));
  const enddate = formatDateLocal(new Date(year, month + 1, 0));
  const [lessons, setLessons] = useState([]);
  const role=localStorage.getItem('userRole');

  const ChangeDate=(number)=>{
    if(month===11 && number===1){
      setMonth(1);
      setYear(year+1);
    }
    else if(month===0 && number===-1){
      setMonth(12);
      setYear(year-1);
    }
    else{
      setMonth(month+number);
    }
  }

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
  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

  return (
    <div className="calendar-container" style={{ 
      maxWidth: '800px', 
      margin: '6rem auto', 
      fontFamily: 'ui-sans-serif, system-ui, sans-serif', 
      backgroundColor: '#0f172a', // slate-900
      color: '#f1f5f9', // slate-100
      padding: '1.5rem', 
      borderRadius: '1rem',
      border: '1px solid #1e293b', // slate-800
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }}>
      
      {/* NAGŁÓWEK KALENDARZA Z NAWIGACJĄ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => ChangeDate(-1)} 
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '0.75rem', fontWeight: '500', transition: 'all 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
        >
          ◀ Poprzedni
        </button>
        
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.025em', uppercase: 'true' }}>
          {monthNames[month]} {year}
        </h2>
        
        <button 
          onClick={() => ChangeDate(1)} 
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '0.75rem', fontWeight: '500', transition: 'all 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
        >
          Następny ▶
        </button>
      </div>

      {/* NAGŁÓWKI DNI TYGODNIA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', fontWeight: '600', fontSize: '0.875rem', textAlign: 'center', color: '#94a3b8', paddingBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div>Pn</div><div>Wt</div><div>Śr</div><div>Cz</div><div>Pt</div><div>Sb</div><div>Nd</div>
      </div>

      {/* GŁÓWNA SIATKA KALENDARZA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
        {calendarCells.map((cell) => {
          // 1. FILTROWANIE LEKCJI DLA DANEGO DNIA
          const dayLessons = cell.fullDate && Array.isArray(lessons)
            ? lessons.filter(lesson => {
                if (!lesson.data) return false;
                let lessonDateShort = "";

                if (typeof lesson.data === 'string') {
                  lessonDateShort = lesson.data.includes('T') ? lesson.data.split('T')[0] : lesson.data.split(' ')[0];
                } else if (Array.isArray(lesson.data)) {
                  const yearStr = lesson.data[0];
                  const monthStr = String(lesson.data[1]).padStart(2, '0');
                  const dayStr = String(lesson.data[2]).padStart(2, '0');
                  lessonDateShort = `${yearStr}-${monthStr}-${dayStr}`;
                }
                return lessonDateShort === cell.fullDate;
              })
            : [];

          return (
            <div 
              key={cell.id} 
              style={{ 
                border: cell.dayNumber ? '1px solid #1e293b' : 'none', 
                minHeight: '100px', 
                padding: '6px',
                backgroundColor: cell.dayNumber ? '#020617' : 'transparent', // slate-950
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                borderRadius: '0.75rem',
                transition: 'border-color 0.2s'
              }}
            >
              {/* Numer dnia */}
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textAlign: 'right', marginBottom: '4px' }}>
                {cell.dayNumber}
              </div>
              
              {/* LISTA LEKCJI W DANYM DNIU */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
                {dayLessons.map((lesson) => {
                  let hour = "";

                  if (typeof lesson.data === 'string' && lesson.data.includes('T')) {
                    hour = lesson.data.split('T')[1].substring(0, 5);
                  } else if (typeof lesson.data === 'string' && lesson.data.includes(' ')) {
                    hour = lesson.data.split(' ')[1].substring(0, 5);
                  } else if (Array.isArray(lesson.data) && lesson.data.length >= 5) {
                    const hStr = String(lesson.data[3]).padStart(2, '0');
                    const mStr = String(lesson.data[4]).padStart(2, '0');
                    hour = `${hStr}:${mStr}`;
                  }

                  return (
                    // ⚡ ZMIANA: Cały boks stał się klikalny, czysty i nowoczesny
                    <div 
                      key={lesson.id} 
                      onClick={() => navigate(`/${role}/lessonInformation/${lesson.id}`)}
                      style={{ 
                        backgroundColor: 'rgba(2, 132, 199, 0.15)', // przezroczysty sky-600
                        border: '1px solid #0284c7',
                        color: '#38bdf8', // sky-400
                        fontSize: '11px', 
                        fontWeight: '600',
                        padding: '4px 6px', 
                        borderRadius: '6px',
                        cursor: 'pointer',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0284c7';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.15)';
                        e.currentTarget.style.color = '#38bdf8';
                      }}
                      title={`Lekcja o ${hour}, Cena: ${lesson.prize} zł. Kliknij po szczegóły.`}
                    >
                      ⏰ {hour || "??:??"}
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