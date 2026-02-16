'use client';

import { useCatalogFilters } from '@/lib/hooks/use-catalog-filters';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const BODY_TYPES = ['Седан', 'Кроссовер', 'Внедорожник', 'Минивэн', 'Купе'];
const DRIVE_TYPES = ['Передний', 'Задний', 'Полный'];
const ENGINE_TYPES = ['Электро', 'Бензин', 'Гибрид'];

export function CatalogFilters() {
  const {
    bodyTypes, setBodyTypes,
    priceRange, setPriceRange,
    powerRange, setPowerRange,
    driveTypes, setDriveTypes,
    engineTypes, setEngineTypes,
    resetFilters
  } = useCatalogFilters();

  const handleCheckboxChange = (type: 'body' | 'drive' | 'engine', value: string, checked: boolean) => {
    if (type === 'body') {
      setBodyTypes(checked ? [...bodyTypes!, value] : bodyTypes!.filter(t => t !== value));
    } else if (type === 'drive') {
      setDriveTypes(checked ? [...driveTypes!, value] : driveTypes!.filter(t => t !== value));
    } else if (type === 'engine') {
      setEngineTypes(checked ? [...engineTypes!, value] : engineTypes!.filter(t => t !== value));
    }
  };

  return (
    <div className="space-y-6 bg-zinc-950 p-6 rounded-3xl border border-zinc-900">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Фильтры</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-zinc-500 hover:text-white">
          Сбросить
        </Button>
      </div>

      <Separator className="bg-zinc-900" />

      <Accordion type="multiple" defaultValue={['price', 'body']} className="w-full">
        <AccordionItem value="price" className="border-zinc-900">
          <AccordionTrigger className="text-white hover:no-underline">Цена (₽)</AccordionTrigger>
          <AccordionContent className="pt-4 px-1">
            <Slider
              defaultValue={priceRange || [0, 20000000]}
              max={20000000}
              step={100000}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mb-6"
            />
            <div className="flex justify-between text-xs text-zinc-400">
              <span>{priceRange?.[0].toLocaleString() || '0'} ₽</span>
              <span>{priceRange?.[1].toLocaleString() || '20M'} ₽</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="body" className="border-zinc-900">
          <AccordionTrigger className="text-white hover:no-underline">Тип кузова</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-2">
            {BODY_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`body-${type}`}
                  checked={bodyTypes?.includes(type)}
                  onCheckedChange={(checked) => handleCheckboxChange('body', type, !!checked)}
                  className="border-zinc-700 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor={`body-${type}`} className="text-sm text-zinc-400 cursor-pointer hover:text-white transition-colors">
                  {type}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="power" className="border-zinc-900">
          <AccordionTrigger className="text-white hover:no-underline">Мощность (л.с.)</AccordionTrigger>
          <AccordionContent className="pt-4 px-1">
            <Slider
              defaultValue={powerRange || [0, 1000]}
              max={1000}
              step={10}
              onValueChange={(value) => setPowerRange(value as [number, number])}
              className="mb-6"
            />
            <div className="flex justify-between text-xs text-zinc-400">
              <span>{powerRange?.[0] || '0'} л.с.</span>
              <span>{powerRange?.[1] || '1000'} л.с.</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="drive" className="border-zinc-900">
          <AccordionTrigger className="text-white hover:no-underline">Привод</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-2">
            {DRIVE_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`drive-${type}`}
                  checked={driveTypes?.includes(type)}
                  onCheckedChange={(checked) => handleCheckboxChange('drive', type, !!checked)}
                  className="border-zinc-700 data-[state=checked]:bg-primary"
                />
                <Label htmlFor={`drive-${type}`} className="text-sm text-zinc-400 cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="engine" className="border-zinc-900">
          <AccordionTrigger className="text-white hover:no-underline">Двигатель</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-2">
            {ENGINE_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`engine-${type}`}
                  checked={engineTypes?.includes(type)}
                  onCheckedChange={(checked) => handleCheckboxChange('engine', type, !!checked)}
                  className="border-zinc-700 data-[state=checked]:bg-primary"
                />
                <Label htmlFor={`engine-${type}`} className="text-sm text-zinc-400 cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default CatalogFilters;
