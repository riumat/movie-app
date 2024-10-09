import { CrewFormatted, CrewMember } from "@/utils/types";

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

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.ceil(minutes % 60);
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  } else {
    return `${remainingMinutes}m`;
  }
}

export const formattedCrewList = (crew: CrewMember[]): CrewMember[] => {
  const relevantJobs = [
    "Director",
    "Writer",
    "Screenplay",
    "Director of Photography",
    "Editor",
    "Music Composer",
  ];

  return crew
    .filter(member => relevantJobs.includes(member.job as string))
    .reduce((acc, member) => {
      const existingMember = acc.find(m => m.id === member.id);
      if (existingMember) {
        existingMember.job += `, ${member.job as string}`;
      } else {
        acc.push({
          id: member.id,
          name: member.name,
          profile_path: member.profile_path,
          job: member.job as string,
        });
      }
      return acc;
    }, [] as Array<{ id: number; name: string; profile_path: string; job: string }>)
    .sort((a, b) => {
      const jobA = a.job.split(', ')[0];
      const jobB = b.job.split(', ')[0];
      return relevantJobs.indexOf(jobA) - relevantJobs.indexOf(jobB);
    });
}
