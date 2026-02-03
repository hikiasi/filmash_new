import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema } from "@shared/schema";
import { useCreateOrder } from "@/hooks/use-orders";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import InputMask from "react-input-mask";

export function OrderForm() {
  const mutation = useCreateOrder();
  
  const form = useForm<z.infer<typeof insertOrderSchema>>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      name: "",
      phone: "",
      carMake: "",
      carModel: "",
      year: "",
      budget: "",
      comments: ""
    }
  });

  function onSubmit(data: z.infer<typeof insertOrderSchema>) {
    mutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Иван Иванов" {...field} className="h-12 bg-white/50" />
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
                <FormLabel>Телефон</FormLabel>
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
                      <Input placeholder="+7 (999) 000-00-00" {...inputProps} className="h-12 bg-white/50" />
                    )}
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="carMake"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Марка авто</FormLabel>
                <FormControl>
                  <Input placeholder="Toyota" {...field} className="bg-white/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Модель</FormLabel>
                <FormControl>
                  <Input placeholder="Camry" {...field} className="bg-white/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Год выпуска (от)</FormLabel>
                <FormControl>
                  <Input placeholder="2020" {...field} value={field.value || ''} className="bg-white/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Бюджет (₽)</FormLabel>
                <FormControl>
                  <Input placeholder="3 000 000" {...field} value={field.value || ''} className="bg-white/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комментарий (необязательно)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Особые пожелания: цвет, комплектация..." 
                  className="resize-none bg-white/50 min-h-[100px]" 
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
          variant="default" 
          className="w-full bg-[#4380c2] hover:bg-[#326094]"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Отправка...
            </>
          ) : (
            "Оставить заявку на подбор"
          )}
        </Button>
      </form>
    </Form>
  );
}
