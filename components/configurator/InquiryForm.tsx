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
import ReactInputMask from 'react-input-mask';

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

  // Calculate prices for the snapshot
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

  if (isSuccess) {
    return (
      <div className="p-12 text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle2 className="size-16 text-primary animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-white">Заявка отправлена!</h2>
        <p className="text-zinc-400">Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.</p>
        <Button onClick={onComplete} className="mt-6">Закрыть</Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Оформить заявку</h2>
        <p className="text-zinc-500 text-sm mt-1">Оставьте свои контакты, и мы подготовим расчет для {selectedTrim?.name}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">Ваше имя</FormLabel>
                <FormControl>
                  <Input placeholder="Александр" {...field} className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">Телефон</FormLabel>
                <FormControl>
                  <ReactInputMask
                    mask="+7 (999) 999-99-99"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {((inputProps: any) => (
                      <Input
                        {...inputProps}
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:ring-primary"
                      />
                    )) as any}
                  </ReactInputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" {...field} className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-white text-black hover:bg-zinc-200 font-bold rounded-2xl text-lg transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ОТПРАВКА...
                </>
              ) : (
                'ОТПРАВИТЬ ЗАЯВКУ'
              )}
            </Button>
            <p className="text-[10px] text-zinc-600 text-center mt-4 uppercase tracking-widest">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
