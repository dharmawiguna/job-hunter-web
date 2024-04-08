import { Form } from "@/components/ui/form";
import { filterFormType } from "@/types";
import { FC } from "react";
import CheckBoxForms from "./CheckboxForms";
import { Button } from "@/components/ui/button";

interface FormFilterDynamicProps {
  formFilter: any;
  onSubmitFilter: (val: any) => Promise<void>;
  filterForms: filterFormType[];
}

const FormFilterDynamic: FC<FormFilterDynamicProps> = ({
  filterForms,
  onSubmitFilter,
  formFilter,
}) => {
  return (
    <Form {...formFilter}>
      <form onSubmit={formFilter.handleSubmit(onSubmitFilter)}>
        {filterForms.map((item: filterFormType, i: number) => (
          <CheckBoxForms
            formFilter={formFilter}
            items={item.items}
            label={item.label}
            name={item.name}
            key={i}
          />
        ))}

        <Button className="mt-5 w-full">Apply filter</Button>
        <Button variant={"outline"} className="mt-3 w-full">
          Reset filter
        </Button>
      </form>
    </Form>
  );
};

export default FormFilterDynamic;
