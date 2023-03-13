// 轮播图
export interface IBanner {
	imageUrl: string
	targetId: number
	adid: any
	targetType: number
	titleColor: string
	typeTitle: string
	url?: string
	exclusive: boolean
	monitorImpress: any
	monitorClick: any
	monitorType: any
	monitorImpressList: any
	monitorClickList: any
	monitorBlackList: any
	extMonitor: any
	extMonitorInfo: any
	adSource: any
	adLocation: any
	adDispatchJson: any
	encodeId: string
	program: any
	event: any
	video: any
	song: any
	scm: string
	bannerBizType: string
}

export interface IBannersResult {
	banners: Array<IBanner>
	code: number
}

// 热门推荐
export interface IPersonalized {
	id: number
	type: number
	name: string
	copywriter: string
	picUrl: string
	canDislike: boolean
	trackNumberUpdateTime: number
	playCount: number
	trackCount: number
	highQuality: boolean
	alg: string
}

export interface IPersonalizedResult {
	hasTaste: boolean
	code: number
	category: number
	result: Array<IPersonalized>
}

// 新碟上架

export interface IArtist {
	name: string
	id: number
	picId: number
	img1v1Id: number
	briefDesc: string
	picUrl: string
	img1v1Url: string
	albumSize: number
	alias: Array<any>
	trans: string
	musicSize: number
	topicPerson: number
	img1v1Id_str: string
}

export interface IArtistInAlbum extends IArtist {
	picId_str: string
	transNames?: Array<string>
}

export interface IAlbum {
	name: string
	id: number
	type: string
	size: number
	picId: number
	blurPicUrl: string
	companyId: number
	pic: number
	picUrl: string
	publishTime: number
	description: string
	tags: string
	company: string
	briefDesc: string
	artist: IArtistInAlbum
	songs: any
	alias: Array<any>
	status: number
	copyrightId: number
	commentThreadId: string
	artists: Array<IArtist>
	paid: boolean
	onSale: boolean
	picId_str: string
}

export interface iAlbumRsesult {
	code: number
	albums: Array<IAlbum>
}

// 榜单
export interface IPlaylist {
	id: number
	name: string
	coverImgId: number
	coverImgUrl: string
	coverImgId_str: string
	adType: number
	userId: number
	createTime: number
	status: number
	opRecommend: boolean
	highQuality: boolean
	newImported: boolean
	updateTime: number
	trackCount: number
	specialType: number
	privacy: number
	trackUpdateTime: number
	commentThreadId: string
	playCount: number
	trackNumberUpdateTime: number
	subscribedCount: number
	cloudTrackCount: number
	ordered: boolean
	description: string
	tags: Array<any>
	updateFrequency: any
	backgroundCoverId: number
	backgroundCoverUrl: any
	titleImage: number
	titleImageUrl: any
	englishTitle: any
	officialPlaylistType: any
	copied: boolean
	relateResType: any
	subscribers: Array<{
		defaultAvatar: boolean
		province: number
		authStatus: number
		followed: boolean
		avatarUrl: string
		accountStatus: number
		gender: number
		city: number
		birthday: number
		userId: number
		userType: number
		nickname: string
		signature: string
		description: string
		detailDescription: string
		avatarImgId: number
		backgroundImgId: number
		backgroundUrl: string
		authority: number
		mutual: boolean
		expertTags: any
		experts: any
		djStatus: number
		vipType: number
		remarkName: any
		authenticationTypes: number
		avatarDetail: any
		avatarImgIdStr: string
		anchor: boolean
		backgroundImgIdStr: string
		avatarImgId_str: string
	}>
	subscribed: boolean
	creator: {
		defaultAvatar: boolean
		province: number
		authStatus: number
		followed: boolean
		avatarUrl: string
		accountStatus: number
		gender: number
		city: number
		birthday: number
		userId: number
		userType: number
		nickname: string
		signature: string
		description: string
		detailDescription: string
		avatarImgId: number
		backgroundImgId: number
		backgroundUrl: string
		authority: number
		mutual: boolean
		expertTags: any
		experts: any
		djStatus: number
		vipType: number
		remarkName: any
		authenticationTypes: number
		avatarDetail: {
			userType: number
			identityLevel: number
			identityIconUrl: string
		}
		avatarImgIdStr: string
		anchor: boolean
		backgroundImgIdStr: string
		avatarImgId_str: string
	}
	tracks: Array<{
		name: string
		id: number
		pst: number
		t: number
		ar: Array<{
			id: number
			name: string
			tns: Array<any>
			alias: Array<any>
		}>
		alia: Array<string>
		pop: number
		st: number
		rt?: string
		fee: number
		v: number
		crbt: any
		cf: string
		al: {
			id: number
			name: string
			picUrl: string
			tns: Array<string>
			pic_str?: string
			pic: number
		}
		dt: number
		h: {
			br: number
			fid: number
			size: number
			vd: number
		}
		m: {
			br: number
			fid: number
			size: number
			vd: number
		}
		l: {
			br: number
			fid: number
			size: number
			vd: number
		}
		sq?: {
			br: number
			fid: number
			size: number
			vd: number
		}
		hr?: {
			br: number
			fid: number
			size: number
			vd: number
		}
		a: any
		cd: string
		no: number
		rtUrl: any
		ftype: number
		rtUrls: Array<any>
		djId: number
		copyright: number
		s_id: number
		mark: number
		originCoverType: number
		originSongSimpleData?: {
			songId: number
			name: string
			artists: Array<{
				id: number
				name: string
			}>
			albumMeta: {
				id: number
				name: string
			}
		}
		tagPicList: any
		resourceState: boolean
		version: number
		songJumpInfo: any
		entertainmentTags: any
		single: number
		noCopyrightRcmd: any
		mst: number
		cp: number
		mv: number
		rtype: number
		rurl: any
		publishTime: number
		tns?: Array<string>
	}>
	videoIds: any
	videos: any
	trackIds: Array<{
		id: number
		v: number
		t: number
		at: number
		alg: any
		uid: number
		rcmdReason: string
		sc: any
		f: any
		sr: any
		ratio: number
		lr?: number
	}>
	bannedTrackIds: any
	mvResourceInfos: any
	shareCount: number
	commentCount: number
	remixVideo: any
	sharedUsers: any
	historySharedUsers: any
	gradeStatus: string
	score: any
	algTags: any
	ToplistType: string
}

export interface IPopularRankingResult {
	code: number
	relatedVideos: any
	playlist: IPlaylist
	urls: any
	privileges: Array<{
		id: number
		fee: number
		payed: number
		realPayed: number
		st: number
		pl: number
		dl: number
		sp: number
		cp: number
		subp: number
		cs: boolean
		maxbr: number
		fl: number
		pc: any
		toast: boolean
		flag: number
		paidBigBang: boolean
		preSell: boolean
		playMaxbr: number
		downloadMaxbr: number
		maxBrLevel: string
		playMaxBrLevel: string
		downloadMaxBrLevel: string
		plLevel: string
		dlLevel: string
		flLevel: string
		rscl: any
		freeTrialPrivilege: {
			resConsumable: boolean
			userConsumable: boolean
			listenType: any
		}
		chargeInfoList: Array<{
			rate: number
			chargeUrl: any
			chargeMessage: any
			chargeType: number
		}>
	}>
	sharedPrivilege: any
	resEntrance: any
	fromUsers: any
	fromUserCount: number
	songFromUsers: any
}

// 艺术家

export interface IArtist {
	albumSize: number
	alias: Array<string>
	briefDesc: string
	fansCount: number
	followed: boolean
	id: number
	img1v1Id: number
	img1v1Id_str: string
	img1v1Url: string
	musicSize: number
	name: string
	picId: number
	picId_str?: string
	picUrl: string
	topicPerson: number
	trans: string
	accountId?: number
}

export interface IArtistResult {
	artists: Array<IArtist>
	more: boolean
	code: number
}
