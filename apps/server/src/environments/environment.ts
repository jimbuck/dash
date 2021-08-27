export const environment = {
	production: false,
	get dev() { return !environment.production; },
};
