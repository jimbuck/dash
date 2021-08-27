export const environment = {
	production: true,
	get dev() { return !environment.production; },
};
