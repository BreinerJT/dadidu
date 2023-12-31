// Generated by https://quicktype.io

export interface Data {
	rspValue: string;
	rspMessage: string;
	rspParentKey: string;
	rspAppKey: string;
	rspPagination: RspPagination;
	rspData: User[];
}

export interface User {
	recIdeunikeyReus: number;
	recNroregReus: string;
	recNiknamReus: string;
	recNroideReus: string;
	recNombreReus: string;
	recApelidReus: string;
	recFecnacReus: string;
	recSexusuReus: string;
	recNomusuReus: string;
	recImgvisReus: string;
	recDirresReus: string;
	recTelefoReus: string;
	apjCorreoApgm: string;
	sisCodpaiSipa: string;
	sisIdedptSidp: string;
	sisCodproSipr: string;
	recCodposReus: string;
	recGeolatReus: number;
	recGeolonReus: number;
	sisCountaRkey: number;
	sisCountbRkey: number;
	sisCountcRkey: number;
	sisCountdRkey: number;
	sisCounteRkey: number;
	sisCountfRkey: number;
	recEstregReus: string;
	resumEstadist: ResumEstadist;
}

export interface ResumEstadist {
	recContractTotal: number;
	recContractOkey: number;
	recContractDown: number;
	recCommentsTotal: number;
}

export interface RspPagination {
	currentPage: number;
	totalPageSize: number;
	totalResults: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	nextPageUrl: string;
	previousPageUrl: string;
}
