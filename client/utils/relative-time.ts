export const relativeTime = (oldTimestamp: number) => {
  const difference = (Date.now() / 1000) - oldTimestamp;

  let output: string;

  if (difference < 60) {
    output = `${ difference } seconds ago`;
  } else if (difference < 3600) {
    output = `${ Math.floor(difference / 60) } minutes ago`;
  } else if (difference < 86400) {
    output = `${ Math.floor(difference / 3600) } hours ago`;
  } else if (difference < 2620800) {
    output = `${ Math.floor(difference / 86400) } days ago`;
  } else if (difference < 31449600) {
    output = `${ Math.floor(difference / 2620800) } months ago`;
  } else {
    output = `${ Math.floor(difference / 31449600) } years ago`;
  }

  return output;
}
