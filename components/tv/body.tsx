"use client"
import ProviderSection from '@/components/content/provider-section';
import VideoSection from '@/components/content/video-section';
import React, { useState } from 'react';
import CreditsList from '@/components/people/credits-list';
import ContentNavbar from '@/components/content/content-navbar';
import SimilarContentSection from '@/components/content/similar-content-section';
import SeasonsSection from '@/components/tv/seasons-section';
import { TvData } from '@/lib/types/tv';
import { Selection } from '@/lib/types/content';

const sectionComponents = {
  crew: (data: TvData) => (
    <CreditsList personList={data.credits.crew} />
  ),
  cast: (data: TvData) => (
    <CreditsList personList={data.credits.cast} />
  ),
  seasons: (data: TvData) => (
    <SeasonsSection seasons={data.seasons} />
  ),
  watch: (data: TvData) => (
    <ProviderSection providers={data.providers} />
  ),
  videos: (data: TvData) => (
    <VideoSection videoInfo={data.videos} />
  ),
  similar: (data: TvData, similarData: any) => (
    <SimilarContentSection
      recommendations={data.recommendations}
      similarData={similarData}
    />
  )
};

const Body = ({ tvData, similarData }: { tvData: TvData, similarData: any }) => {
  const [selection, setSelection] = useState<Selection>("cast");

  const SelectedSection = () => {
    const SectionComponent = sectionComponents[selection as keyof typeof sectionComponents];
    return (
      <div className={`
        flex flex-col gap-5 
        ${selection === 'videos' ? 'h-full mt-10 justify-around' : 'my-10 w-full h-full pb-20'}
      `}>
        {SectionComponent && SectionComponent(tvData, similarData)}
      </div>
    );
  };

  return (
    <section className="bg-background text-foreground w-full">
      <div className='flex flex-col mt-5 mb-10 mx-5'>
        <ContentNavbar
          setSelection={setSelection}
          selection={selection}
          media={tvData.type}
        />
        <div className='rounded-xl z-0 flex-1 overflow-hidden relative min-h-[650px]'>
          <SelectedSection />
        </div>
      </div>
    </section>
  );
};

export default Body;
