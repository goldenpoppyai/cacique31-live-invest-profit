/**
 * ProfessionalCalendar Component
 * 
 * Professional calendar widget for scheduling property viewings
 * Features time slots, form validation, and booking confirmation
 */

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { format, isSameDay, isAfter, startOfDay } from 'date-fns';

interface TimeSlot {
  time: string;
  available: boolean;
  type: 'morning' | 'afternoon' | 'evening';
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: Date | undefined;
  timeSlot: string;
  message: string;
  proofOfFunds: boolean;
}

interface ProfessionalCalendarProps {
  onBookingSubmit?: (booking: BookingData) => void;
  className?: string;
}

const ProfessionalCalendar: React.FC<ProfessionalCalendarProps> = ({
  onBookingSubmit,
  className = ''
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    date: undefined,
    timeSlot: '',
    message: '',
    proofOfFunds: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Available time slots
  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true, type: 'morning' },
    { time: '10:00 AM', available: true, type: 'morning' },
    { time: '11:00 AM', available: false, type: 'morning' },
    { time: '2:00 PM', available: true, type: 'afternoon' },
    { time: '3:00 PM', available: true, type: 'afternoon' },
    { time: '4:00 PM', available: true, type: 'afternoon' },
    { time: '5:00 PM', available: false, type: 'evening' },
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot('');
    setBookingData(prev => ({ ...prev, date, timeSlot: '' }));
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    setBookingData(prev => ({ ...prev, timeSlot }));
  };

  const handleInputChange = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!bookingData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!bookingData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!bookingData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!selectedDate) {
      newErrors.date = 'Please select a date';
    }

    if (!selectedTimeSlot) {
      newErrors.timeSlot = 'Please select a time slot';
    }

    if (!bookingData.proofOfFunds) {
      newErrors.proofOfFunds = 'Proof of funds confirmation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const finalBookingData = {
        ...bookingData,
        date: selectedDate,
        timeSlot: selectedTimeSlot
      };
      
      onBookingSubmit?.(finalBookingData);
      setIsSubmitted(true);
    }
  };

  // Filter out past dates
  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    return !isAfter(date, today) && !isSameDay(date, today);
  };

  if (isSubmitted) {
    return (
      <Card className={`w-full max-w-2xl mx-auto ${className}`}>
        <CardContent className="p-8 text-center">
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Viewing Scheduled!</h3>
          <p className="text-muted-foreground mb-6">
            Your private viewing has been scheduled for{' '}
            <strong>{selectedDate && format(selectedDate, 'EEEE, MMMM do, yyyy')}</strong>{' '}
            at <strong>{selectedTimeSlot}</strong>.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Next Steps</h4>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Confirmation email sent to {bookingData.email}</li>
              <li>• Our team will call you within 2 hours</li>
              <li>• Detailed viewing information will be provided</li>
              <li>• Please bring valid ID and proof of funds</li>
            </ul>
          </div>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setSelectedDate(undefined);
              setSelectedTimeSlot('');
              setBookingData({
                name: '',
                email: '',
                phone: '',
                date: undefined,
                timeSlot: '',
                message: '',
                proofOfFunds: false
              });
            }}
            variant="outline"
          >
            Schedule Another Viewing
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon size={20} className="text-accent" />
              Select Date
            </CardTitle>
            <CardDescription>
              Choose your preferred viewing date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-2">{errors.date}</p>
            )}

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-6">
                <Label className="text-base font-semibold mb-3 block flex items-center gap-2">
                  <Clock size={16} className="text-accent" />
                  Available Times
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      onClick={() => handleTimeSlotSelect(slot.time)}
                      className="w-full text-sm"
                    >
                      {slot.time}
                      {!slot.available && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Booked
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
                {errors.timeSlot && (
                  <p className="text-red-500 text-sm mt-2">{errors.timeSlot}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} className="text-accent" />
              Your Information
            </CardTitle>
            <CardDescription>
              Please provide your contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail size={14} />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone size={14} />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Special Requests (Optional)</Label>
                <Textarea
                  id="message"
                  value={bookingData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Any specific areas of interest or questions..."
                  rows={3}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="proofOfFunds"
                  checked={bookingData.proofOfFunds}
                  onChange={(e) => handleInputChange('proofOfFunds', e.target.checked)}
                  className="mt-1 w-4 h-4 text-accent border-border rounded focus:ring-2 focus:ring-accent"
                />
                <div>
                  <Label htmlFor="proofOfFunds" className="cursor-pointer">
                    I will provide proof of funds or banker's letter *
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Required for all private viewings
                  </p>
                </div>
              </div>
              {errors.proofOfFunds && (
                <p className="text-red-500 text-sm">{errors.proofOfFunds}</p>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={!selectedDate || !selectedTimeSlot}
              >
                Schedule Private Viewing
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalCalendar;