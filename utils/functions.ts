import { relevantMovieJobs, relevantTvJobs } from "@/utils/constants";
import { CastMember, WorkMember } from "@/utils/types";

export function formatDate(inputDate: string): string {
  const [year, month, day] = inputDate.split('-');
  return `${day}/${month}/${year}`;
}


export function formatNumber(number: number): string {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}

export const formatTvDuration = (start: string, end: string): string => {
  const [year] = start.split('-');
  const [endYear] = end.split('-');
  return `${year} - ${endYear}`;

}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.ceil(minutes % 60);
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  } else {
    return `${remainingMinutes}m`;
  }
}


export const formatCrewList = (crew: { id: number, name: string, profile_path: string, job: string }[]): WorkMember[] => {
  return crew
    .filter(member => relevantMovieJobs.includes(member.job))
    .reduce((acc, member) => {
      const existingMember = acc.find(m => m.id === member.id);
      if (existingMember) {
        existingMember.job += `, ${member.job as string}`;
      } else {
        acc.push({
          id: member.id,
          name: member.name,
          profile_path: member.profile_path,
          job: member.job,
        });
      }
      return acc;
    }, [] as Array<WorkMember>)
    .sort((a, b) => {
      const jobA = a.job.toLowerCase().includes("director");
      const jobB = b.job.toLowerCase().includes("director");
      if (jobA && !jobB) return -1;
      if (!jobA && jobB) return 1;
      return relevantMovieJobs.indexOf(a.job) - relevantMovieJobs.indexOf(b.job);
    })
}

export const formatTvAggregate = (crew: { id: number, name: string, profile_path: string, jobs: { job: string }[] }[]): WorkMember[] => {
  return crew
    .filter(member => member.jobs.some(job => relevantTvJobs.includes(job.job)))
    .map(member => ({
      id: member.id,
      name: member.name,
      profile_path: member.profile_path,
      job: member.jobs.map(job => job.job).filter((job, index, self) => self.indexOf(job) === index).join(', '),
    }))
}

export const formatTvCastList = (cast: { id: number, name: string, profile_path: string, roles: { character: string }[] }[]): CastMember[] => {
  return cast.map(member => ({
    id: member.id,
    name: member.name,
    profile_path: member.profile_path,
    character: member.roles.map(role => role.character).join(', '),    
  }))
}

export const mergeProviders = (rent: any, buy: any, flatrate: any, ads: any, free: any) => {
  const mergedProviders = [...rent, ...buy, ...flatrate, ...ads, ...free];
  return mergedProviders
    .filter(provider => provider.display_priority < 40)
    .map((provider) => {
      if (rent.includes(provider)) return { ...provider, category: 'Rent or buy' };
      if (buy.includes(provider)) return { ...provider, category: 'Rent or buy' };
      if (flatrate.includes(provider)) return { ...provider, category: 'Streaming' };
      if (ads.includes(provider)) return { ...provider, category: 'Streaming with ads' };
      if (free.includes(provider)) return { ...provider, category: 'Streaming' };
    })
    .filter((provider, index, self) =>
      index === self.findIndex((p) => p.provider_id === provider.provider_id)
    )
    .sort((a, b) => (a.display_priority < b.display_priority ? -1 : b.display_priority < a.display_priority ? 1 : 0))
    .sort((a, b) => (a.category === 'Streaming' ? -1 : b.category === 'Streaming' ? 1 : 0))
    .slice(0, 5)
};