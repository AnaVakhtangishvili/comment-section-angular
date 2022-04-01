import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInWeeks, differenceInYears } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(creationDate: string | undefined): string | undefined {
    if (creationDate) {
      const differeneceInSeconds = differenceInSeconds(
        new Date(),
        new Date(creationDate)
      );
      const differeneceInMinutes = differenceInMinutes(
        new Date(),
        new Date(creationDate)
      );
      const differeneceInHours = differenceInHours(
        new Date(),
        new Date(creationDate)
      );
      const differeneceInDays = differenceInDays(
        new Date(),
        new Date(creationDate)
      );
      const differeneceInWeeks = differenceInWeeks(
        new Date(),
        new Date(creationDate)
      );
      const differeneceInMonts = differenceInMonths(
        new Date(),
        new Date(creationDate)
      );
      const differeneceInYears = differenceInYears(
        new Date(),
        new Date(creationDate)
      );
      
      if (differeneceInMonts >= 12) {
        return differeneceInYears < 2
          ? `year ago`
          : `${differeneceInYears} years ago`;
      }
      if (differeneceInWeeks >= 4) {
        return differeneceInMonts < 2
          ? `month ago`
          : `${differeneceInMonts} months ago`;
      }
      if (differeneceInDays >= 7) {
        return differeneceInWeeks < 2
          ? `week ago`
          : `${differeneceInWeeks} weeks ago`;
      }
      if (differeneceInHours >= 24) {
        return differeneceInDays < 2
          ? `day ago`
          : `${differeneceInDays} days ago`;
      }
      if (differeneceInMinutes >= 60) {
        return differeneceInHours < 2
          ? `hour ago`
          : `${differeneceInHours} hours ago`;
      }
      if (differeneceInSeconds >= 60) {
        return differeneceInMinutes < 2
          ? `minute ago`
          : `${differeneceInMinutes} minutes ago`;
      }
      if (differeneceInSeconds < 60) {
        return `just now`;
      }
  
      return creationDate;
    } else {
      return undefined;
    }
  }
}
