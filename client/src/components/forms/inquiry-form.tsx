import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import InputMask from "react-input-mask";

export function InquiryForm() {
  const mutation = useCreateInquiry();
  
  const form = useForm<z.infer<typeof insertInquirySchema>>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      message: ""
    }
  });

  function onSubmit(data: z.infer<typeof insertInquirySchema>) {
    mutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90 font-medium">Ваше имя</FormLabel>
              <FormControl>
                <Input placeholder="Алексей" {...field} className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#cff902] transition-all" />
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
              <FormLabel className="text-white/90 font-medium">Телефон</FormLabel>
              <FormControl>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                >
                  {/* @ts-ignore */}
                  {(inputProps) => (
                    <Input 
                      placeholder="+7 (999) 000-00-00" 
                      {...inputProps} 
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#cff902] transition-all" 
                    />
                  )}
                </InputMask>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90 font-medium">Ваш вопрос</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Интересует расчет утильсбора..." 
                  className="resize-none bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#cff902] min-h-[120px] transition-all" 
                  {...field} 
                  value={field.value || ''} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          variant="lime" 
          size="lg"
          className="w-full h-14 text-lg mt-4 shadow-xl shadow-[#cff902]/20"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Отправка...
            </>
          ) : (
            "Получить бесплатную консультацию"
          )}
        </Button>
      </form>
    </Form>
  );
}
