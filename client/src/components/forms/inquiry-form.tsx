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
              <FormLabel className="text-white/90">Ваше имя</FormLabel>
              <FormControl>
                <Input placeholder="Алексей" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#cff902]" />
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
              <FormLabel className="text-white/90">Телефон</FormLabel>
              <FormControl>
                <Input placeholder="+7 (999) 000-00-00" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#cff902]" />
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
              <FormLabel className="text-white/90">Ваш вопрос</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Интересует расчет утильсбора..." 
                  className="resize-none bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#cff902] min-h-[120px]" 
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
          className="w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
