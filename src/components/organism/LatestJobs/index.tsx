import TitleSection from "@/components/atoms/TitleSection";
import React, { FC } from "react";
import JobItem from "./JobItem";

interface LatesJobsProps {}

const LatesJobs: FC<LatesJobsProps> = ({}) => {
  return (
    <div className="py-16 mt-32 mb-10 relative">
      <TitleSection word1="latest" word2="jobs open" />
      <div className="mt-12 grid grid-cols-3 gap-8">
        {[0, 1, 2, 3].map((item: number) => (
          <JobItem
            key={item}
            image="/images/company2.png"
            name="Social Media Assistent"
            type="agency"
            location="Singapore"
            jobType="Full Time"
            categories={["Frontend", "Backend"]}
            desc="desc"
          />
        ))}
      </div>
    </div>
  );
};

export default LatesJobs;
