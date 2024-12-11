import { relevantMovieJobs, relevantTvJobs } from "@/lib/constants";
import { CastItem } from "@/lib/types/cast";
import { CrewItem } from "@/lib/types/crew";

export function formatDate(date: string): string {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}


export function formatNumber(number: number): string {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  } else if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  } else {
    return number.toString();
  }
}

export const formatTvDuration = (start: string, end: string): string => {
  if (!start || !end) return '';
  const [year] = start.split('-');
  const [endYear] = end.split('-');
  if (year === endYear) return year
  return `${year} - ${endYear}`;

}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.ceil(minutes % 60);
  if (hours > 0) {
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
  } else {
    return `${remainingMinutes}m`;
  }
}


export const formatCrewList = (crew: { id: number, name: string, profile_path: string, job: string }[]): CrewItem[] => {
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
    }, [] as Array<CrewItem>)
    .sort((a, b) => {
      const jobA = a.job.toLowerCase().includes("director");
      const jobB = b.job.toLowerCase().includes("director");
      if (jobA && !jobB) return -1;
      if (!jobA && jobB) return 1;
      return relevantMovieJobs.indexOf(a.job) - relevantMovieJobs.indexOf(b.job);
    })
}

export const formatTvAggregate = (crew: { id: number, name: string, profile_path: string, jobs: { job: string }[] }[]): CrewItem[] => {
  return crew
    .filter(member => member.jobs.some(job => relevantTvJobs.includes(job.job)))
    .map(member => ({
      id: member.id,
      name: member.name,
      profile_path: member.profile_path,
      job: member.jobs.map(job => job.job).filter((job, index, self) => self.indexOf(job) === index).join(', '),
    }))
}

export const formatTvCastList = (cast: { id: number, name: string, profile_path: string, roles: { character: string }[] }[]): CastItem[] => {
  return cast.map(member => ({
    id: member.id,
    name: member.name,
    profile_path: member.profile_path,
    character: member.roles.map(role => role.character).join(', '),
  }))
}

export const formatProviders = (providers: any) => {
  const flatrate = providers?.flatrate ?? [];
  const rent = providers?.rent ?? [];
  const buy = providers?.buy ?? [];
  const ads = providers?.ads ?? [];
  const free = providers?.free ?? [];
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

};

export const formatFilterProviders = (providers: { provider_id: number, provider_name: string, display_priority: number }[]) => {
  return providers
    .filter((provider) => provider.display_priority < 30)
    .map(provider => ({
      id: provider.provider_id,
      name: provider.provider_name
    }))

}

export const formatCombinedCredits = (cast: { id: number, title: string, media_type: string, release_date: string, poster_path: string, vote_average: number, vote_count: number, genre_ids: number[], character: string, episode_count: number, popularity: number, order: number }[]) => {
  const excludedGenres = [99, 10767, 10764, 10763, 10762, 10768];
  const filteredCredits = cast.filter((credit) => {
    if (credit.media_type !== 'movie' && credit.media_type !== 'tv') {
      return false;
    }
    if (credit.genre_ids.some((genre) => excludedGenres.includes(genre))) {
      return false;
    }
    if (credit.media_type === 'tv' && credit.episode_count < 2) {
      return false
    }
    if (credit.character && credit.character?.toLowerCase().includes('self')) {
      return false;
    }
    if (credit.media_type === "movie" && credit.order > 10) {
      return false;
    }
    if (credit.vote_count > 100 && credit.vote_average < 6) {
      return false
    }
    return true;
  });

  const sortedCredits = filteredCredits.sort((a, b) => b.vote_count - a.vote_count).slice(0, 20);
  return sortedCredits.sort((a, b) => b.vote_average - a.vote_average)
    .filter((credit, index, self) => self.findIndex((c) => c.id === credit.id) === index)
    .slice(0, 20);

}

export const tvTotalDuration = () => {

}

export const getUserDuration = (watched: any) => {
  const totalDuration = watched.reduce((total: number, content: any) => {
    if (content.content_type === 'movie') {
      return total + content.duration;
    } else if (content.content_type === 'tv') {
      return total + content.episode_count * content.duration;
    }
    return total;
  }, 0);
  return formatMinutes(totalDuration)
}

export const getAge = (birthdate: string, deathdate: string) => {
  const endDate = deathdate ? new Date(deathdate) : new Date()
  const birthDate = new Date(birthdate)
  let age = endDate.getFullYear() - birthDate.getFullYear()
  const month = endDate.getMonth() - birthDate.getMonth()

  if (month < 0 || (month === 0 && endDate.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export const movieCount = (watched: any) => {
  const movieCount = watched.filter((content: any) => content.content_type === 'movie').length
  return movieCount
}

export const tvCount = (watched: any) => {
  const tvCount = watched.filter((content: any) => content.content_type === 'tv').length
  return tvCount
}

export const formatDateSince = (date: Date) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString();
  return `${month} ${year}`;
}