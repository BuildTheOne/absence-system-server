export const formatString = (
  input: string,
  format?: 'LOWERCASE' | 'UPPERCASE' | 'TITLE' | 'CAPITALIZE' | 'SLUG'
): string => {
  switch (format) {
    case 'LOWERCASE':
      return input.toLowerCase();
    case 'UPPERCASE':
      return input.toUpperCase();
    case 'TITLE':
      return input.replace(/\b\w/g, (c) => c.toUpperCase());
    case 'CAPITALIZE':
      return input.charAt(0).toUpperCase() + input.slice(1);
    case 'SLUG': {
      let str = input.trim().toLowerCase();
      const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
      const to = 'aaaaeeeeiiiioooouuuunc------';
      for (let i = 0; i < from.length; i++) {
        str = str.replace(new RegExp(from[i], 'g'), to[i]);
      }
      str = str
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      return str;
    }
    default:
      return input;
  }
};
