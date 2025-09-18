import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CalendarView = ({ events, selectedDate, onDateSelect, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date?.toDateString();
    return events?.filter(event => new Date(event.date)?.toDateString() === dateStr);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const getEventPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error';
      case 'medium':
        return 'bg-warning';
      case 'low':
        return 'bg-success';
      default:
        return 'bg-primary';
    }
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentMonth);

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {weekDays?.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {/* Calendar days */}
        {days?.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          
          return (
            <div
              key={index}
              className={`min-h-24 p-1 border border-border cursor-pointer hover:bg-muted/50 smooth-transition ${
                date ? 'bg-card' : 'bg-muted/20'
              } ${
                isSelected(date) ? 'ring-2 ring-primary' : ''
              } ${
                isToday(date) ? 'bg-primary/10' : ''
              }`}
              onClick={() => date && onDateSelect(date)}
            >
              {date && (
                <>
                  <div className={`text-sm font-medium mb-1 ${
                    isToday(date) ? 'text-primary' : 'text-foreground'
                  }`}>
                    {date?.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents?.slice(0, 2)?.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`text-xs px-1 py-0.5 rounded text-white truncate cursor-pointer ${getEventPriorityColor(event?.priority)}`}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onEventClick(event);
                        }}
                      >
                        {event?.title}
                      </div>
                    ))}
                    {dayEvents?.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayEvents?.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate || new Date());
    startOfWeek?.setDate(startOfWeek?.getDate() - startOfWeek?.getDay());
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date?.setDate(startOfWeek?.getDate() + i);
      weekDates?.push(date);
    }

    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDates?.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          
          return (
            <div key={index} className="space-y-2">
              <div className={`text-center p-2 rounded-lg ${
                isToday(date) ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <div className="text-xs font-medium">{weekDays?.[index]}</div>
                <div className="text-lg font-semibold">{date?.getDate()}</div>
              </div>
              <div className="space-y-2 min-h-96">
                {dayEvents?.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`p-2 rounded text-xs text-white cursor-pointer hover-scale ${getEventPriorityColor(event?.priority)}`}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="font-medium truncate">{event?.title}</div>
                    <div className="opacity-80">{event?.time}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">
            {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
          </h2>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => navigateMonth(-1)}
            />
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => navigateMonth(1)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
          >
            Week
          </Button>
        </div>
      </div>
      {/* Calendar Content */}
      {viewMode === 'month' ? renderMonthView() : renderWeekView()}
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded"></div>
          <span className="text-sm text-muted-foreground">High Priority</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded"></div>
          <span className="text-sm text-muted-foreground">Medium Priority</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded"></div>
          <span className="text-sm text-muted-foreground">Low Priority</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;