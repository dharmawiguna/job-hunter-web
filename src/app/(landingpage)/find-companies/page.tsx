"use client";
import { CATEGORIES_OPTIONS } from "@/constants";
import ExploreDataContainer from "@/containers/ExploreDataContainer";
import { formFilterCompanySchema } from "@/lib/form-schema";
import { companyType, filterFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FindCompaniesPageProps {}

const FILTER_FORMS: filterFormType[] = [
  {
    name: "industry",
    label: "Industry",
    items: CATEGORIES_OPTIONS,
  },
];

const dataDummy: companyType[] = [
  {
    image: "/images/company2.png",
    categories: "Marketing",
    description: "lorem",
    name: "Instagram",
    totalJobs: 10,
  },
  {
    image: "/images/company2.png",
    categories: "Marketing",
    description: "lorem",
    name: "Instagram",
    totalJobs: 10,
  },
  {
    image: "/images/company2.png",
    categories: "Marketing",
    description: "lorem",
    name: "Instagram",
    totalJobs: 10,
  },
];

const FindCompaniesPage: FC<FindCompaniesPageProps> = ({}) => {
  const formFilter = useForm<z.infer<typeof formFilterCompanySchema>>({
    resolver: zodResolver(formFilterCompanySchema),
    defaultValues: {
      industry: [],
    },
  });

  const obSubmit = async (val: z.infer<typeof formFilterCompanySchema>) => {
    console.log(val);
  };
  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={obSubmit}
      filterForms={FILTER_FORMS}
      title="dream companies"
      subtitle="find the dream companies you dream work for"
      loading={false}
      type="company"
      data={dataDummy}
    />
  );
};

export default FindCompaniesPage;
