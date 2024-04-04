import { DistrictFilter, FormatFilter, TypeFilter, SpecializationFilter, PriceFilter } from '@components/Specialists';

export function Filters() {
  return (
    <section className="relative z-[9] -mb-[250px] inline-flex w-full flex-col items-start gap-6 py-6">
      <div className="no-scrollbar relative flex w-full touch-pan-x content-start items-start gap-4 overflow-x-auto">
        <TypeFilter />
        <SpecializationFilter />
        <DistrictFilter />
        <PriceFilter />
        <FormatFilter />
      </div>
    </section>
  );
}
