'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, InquiryValues } from '@/lib/validations/inquiry';
import { useConfiguratorStore } from '@/lib/store/configurator-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface InquiryFormProps {
  onComplete: () => void;
}

export function InquiryForm({ onComplete }: InquiryFormProps) {
  const {
    selectedTrim,
    selectedColor,
    selectedWheels,
    selectedInterior,
    selectedOptions
  } = useConfiguratorStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPriceCNY = (Number(selectedTrim?.base_price_cny) || 0) +
    (Number(selectedColor?.additional_price_cny) || 0) +
    (Number(selectedWheels?.additional_price_cny) || 0) +
    (Number(selectedInterior?.additional_price_cny) || 0) +
    selectedOptions.reduce((acc, opt) => acc + (Number(opt.price_cny) || 0), 0);

  const totalPriceRUB = (Number(selectedTrim?.base_price_rub) || 0) +
    (Number(selectedColor?.additional_price_rub) || 0) +
    (Number(selectedWheels?.additional_price_rub) || 0) +
    (Number(selectedInterior?.additional_price_rub) || 0) +
    selectedOptions.reduce((acc, opt) => acc + (Number(opt.price_rub) || 0), 0);

  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      trimId: selectedTrim?.id,
      colorId: selectedColor?.id,
      wheelsId: selectedWheels?.id,
      interiorId: selectedInterior?.id,
      selectedOptions: selectedOptions.map(o => o.id),
      totalPriceCNY,
      totalPriceRUB,
      snapshot: {
        trim: selectedTrim?.name,
        color: selectedColor?.name,
        wheels: selectedWheels?.name,
        interior: selectedInterior?.name,
        options: selectedOptions.map(o => o.name),
        totalPriceRUB,
      }
    },
  });

  const onSubmit = async (values: InquiryValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to submit inquiry');

      setIsSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhone = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 2) return '+' + phoneNumber;
    if (phoneNumberLength < 5) return '+' + phoneNumber.slice(0, 1) + ' (' + phoneNumber.slice(1);
    if (phoneNumberLength < 8) return '+' + phoneNumber.slice(0, 1) + ' (' + phoneNumber.slice(1, 4) + ') ' + phoneNumber.slice(4);
    return '+' + phoneNumber.slice(0, 1) + ' (' + phoneNumber.slice(1, 4) + ') ' + phoneNumber.slice(4, 7) + '-' + phoneNumber.slice(7, 9) + '-' + phoneNumber.slice(9, 11);
  };

  if (isSuccess) {
    return (
      <div className="p-12 text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle2 className="size-16 text-primary animate-bounce" />
        </div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Заявка отправлена!</h2>
        <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Наш менеджер свяжется с вами в ближайшее время.</p>
        <Button onClick={onComplete} className="mt-8 bg-white text-black font-black uppercase tracking-widest px-10 h-14 rounded-2xl">Закрыть</Button>
      </div>
    );
  }

  return (
    <div className="p-10 bg-zinc-950">
      <DialogHeader className="mb-10">
        <DialogTitle className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
            ОФОРМИТЬ <span className="text-primary">ЗАЯВКУ</span>
        </DialogTitle>
        <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">
            Персональный расчет для {selectedTrim?.name}
        </p>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-zinc-400 uppercase text-[10px] font-black tracking-[0.3em] italic">Ваше имя</FormLabel>
                <FormControl>
                  <Input placeholder="АЛЕКСАНДР" {...field} className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus:border-primary text-white font-black uppercase italic placeholder:text-zinc-600 outline-none" />
                </FormControl>
                <FormMessage className="text-[10px] font-black uppercase text-red-500 tracking-widest" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-zinc-400 uppercase text-[10px] font-black tracking-[0.3em] italic">Телефон</FormLabel>
                <FormControl>
                    <Input
                        placeholder="+7 (___) ___-__-__"
                        {...field}
                        onChange={(e) => field.onChange(formatPhone(e.target.value))}
                        className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus:border-primary text-white font-black uppercase italic placeholder:text-zinc-600 outline-none"
                    />
                </FormControl>
                <FormMessage className="text-[10px] font-black uppercase text-red-500 tracking-widest" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-zinc-400 uppercase text-[10px] font-black tracking-[0.3em] italic">Email</FormLabel>
                <FormControl>
                  <Input placeholder="EXAMPLE@MAIL.COM" {...field} className="bg-zinc-900 border-zinc-800 h-14 rounded-2xl focus:border-primary text-white font-black uppercase italic placeholder:text-zinc-600 outline-none" />
                </FormControl>
                <FormMessage className="text-[10px] font-black uppercase text-red-500 tracking-widest" />
              </FormItem>
            )}
          />

          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 bg-zinc-100 text-black hover:bg-white font-black rounded-[1.5rem] text-lg uppercase italic tracking-widest transition-all shadow-lg active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  ОТПРАВКА...
                </>
              ) : (
                'ОТПРАВИТЬ ЗАЯВКУ'
              )}
            </Button>
            <p className="text-[9px] text-zinc-700 text-center mt-6 uppercase font-bold tracking-[0.2em] leading-relaxed">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
