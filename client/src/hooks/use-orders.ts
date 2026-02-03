import { useMutation } from "@tanstack/react-query";
import { api, type InsertOrder } from "@shared/routes";
import { useToast } from "./use-toast";

export function useCreateOrder() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertOrder) => {
      const validated = api.orders.create.input.parse(data);
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.orders.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error('Failed to submit order');
      }

      return api.orders.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Заказ принят!",
        description: "Спасибо за доверие. Менеджер свяжется с вами для уточнения деталей.",
        className: "bg-[#4380c2] text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
