"use client";
import TitleSection from "@/components/atoms/TitleSection";
import React, { FC } from "react";
import JobItem from "./JobItem";
import useFeaturedJobs from "@/hooks/useFeaturedJobs";
import { jobType } from "@/types";

interface LatesJobsProps {}

const LatesJobs: FC<LatesJobsProps> = ({}) => {
  const { jobs, isLoading, error } = useFeaturedJobs();
  return (
    <div className="py-16 mt-32 mb-10 relative">
      <TitleSection word1="latest" word2="jobs open" />
      <div className="mt-12 grid grid-cols-3 gap-8">
        {jobs.map((item: jobType) => (
          <JobItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default LatesJobs;
