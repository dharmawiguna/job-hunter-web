import LatesJobs from "@/components/organism/LatestJobs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import {
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import prisma from "../../../../../../lib/prisma";
import { supabasePublicUrl } from "@/lib/supabase";
import { dateFormat } from "@/lib/utils";
import { companyTeamType } from "@/types";
import { CompanyTeam } from "@prisma/client";

type params = {
  id: string;
};
interface DetailCompanyPageProps {
  params: params;
}

async function getDetailCompany(id: string) {
  const data = await prisma.company.findFirst({
    where: { id },
    include: {
      CompanyOverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
      _count: {
        select: {
          Job: true,
        },
      },
    },
  });

  let imageUrl;

  if (data?.CompanyOverview[0].image) {
    imageUrl = await supabasePublicUrl(
      data.CompanyOverview[0].image,
      "company"
    );
  } else {
    imageUrl = "/images/company2.png";
  }

  return { ...data, imageUrl };
}

const DetailCompanyPage: FC<DetailCompanyPageProps> = async ({ params }) => {
  const data = await getDetailCompany(params.id);

  return (
    <>
      {data && data.CompanyOverview && (
        <div>
          <div className="bg-slate-100 px-32 pt-16 pb-14">
            <div className="inline-flex gap-3 text-sm text-muted-foreground">
              <Link href={"/"} className="hover:underline hover:text-black">
                Home
              </Link>{" "}
              /{" "}
              <Link
                href={"/find-companies"}
                className="hover:underline hover:text-black"
              >
                Companies
              </Link>{" "}
              /{" "}
              <Link
                href={`/detail/company/${data.id}`}
                className="hover:underline hover:text-black"
              >
                {data?.CompanyOverview[0].name}
              </Link>
            </div>

            <div>
              <div className="mt-10 inline-flex gap-6 items-start">
                <Image
                  src={data.imageUrl}
                  alt="company2"
                  width={150}
                  height={150}
                />
                <div>
                  <div className="inline-flex gap-4 items-center">
                    <span className="text-4xl font-semibold">
                      {data.CompanyOverview[0].name}{" "}
                    </span>
                    <Badge>{data._count?.Job} jobs</Badge>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={data.CompanyOverview[0].website}
                      className="font-semibold text-primary"
                    >
                      {data.CompanyOverview[0].website}
                    </Link>
                  </div>
                  <div className="inline-flex items-center gap-10 mt-6">
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="bg-white p-3 rounded-full">
                          <AiOutlineFire className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Founded</div>
                        <div className="font-semibold">
                          {dateFormat(
                            data.CompanyOverview[0].dateFounded,
                            "MMMM DD YYYY"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="bg-white p-3 rounded-full">
                          <BsPeople className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Employees</div>
                        <div className="font-semibold">
                          {data.CompanyOverview[0].employee}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="bg-white p-3 rounded-full">
                          <HiOutlineLocationMarker className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Location</div>
                        <div className="font-semibold">
                          {data.CompanyOverview[0].location}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="bg-white p-3 rounded-full">
                          <HiOutlineOfficeBuilding className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Industry</div>
                        <div className="font-semibold">
                          {data.CompanyOverview[0].industry}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-32 py-16 flex flex-row items-start gap-10">
            <div className="w-3/4">
              <div className="mb-16">
                <div className="text-3xl font-semibold mb-3">
                  Company Profile
                </div>
                <div
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: data.CompanyOverview[0].description,
                  }}
                ></div>
              </div>
              {data.CompanySocialMedia && (
                <div className="">
                  <div className="text-3xl font-semibold mb-4">Contact</div>
                  <div className="flex items-center gap-5 w-[400px] flex-wrap">
                    <div className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold">
                      <FacebookIcon />
                      <span className="text-sm">
                        {data.CompanySocialMedia[0].facebook}
                      </span>
                    </div>
                    <div className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold">
                      <TwitterIcon />
                      <span className="text-sm">
                        {data.CompanySocialMedia[0].twitter}
                      </span>
                    </div>
                    <div className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold">
                      <LinkedinIcon />
                      <span className="text-sm">
                        {data.CompanySocialMedia[0].linkedin}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/4">
              <div className="text-3xl font-semibold mb-4">Tech Stack</div>
              <div className="text-gray-500 text-sm">
                Learn about the technology and tools that Pattern uses
              </div>
              <div className="mt-5 flex flex-row items-center flex-wrap gap-4">
                {data.CompanyOverview[0].techStack.map(
                  (item: string, i: number) => (
                    <Badge key={item + i} className="rounded-sm">
                      {item}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="px-32">
            <Separator />
            {data.CompanyTeam && (
              <div className="my-16">
                <div className="text-3xl font-semibold mb-4">Teams</div>
                <div className="grid grid-cols-5 gap-5 mt-5">
                  {data.CompanyTeam.map((data: CompanyTeam) => (
                    <div
                      key={data.id}
                      className="border border-border px-3 py-5"
                    >
                      <div className="w-16 h-16 rounded-full mx-auto bg-gray-300" />
                      <div className="text-center my-4">
                        <div className="font-semibold text-sm">{data.name}</div>
                        <div className="text-gray-500 text-xs">
                          {data.position}
                        </div>
                      </div>
                      <div className="mx-auto w-max">
                        <div className="inline-flex gap-2">
                          <InstagramIcon className="w-4 h-4 text-gray-500" />
                          <LinkedinIcon className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Separator />
          </div>

          <div className="px-32">
            <LatesJobs />
          </div>
        </div>
      )}
    </>
  );
};

export default DetailCompanyPage;
