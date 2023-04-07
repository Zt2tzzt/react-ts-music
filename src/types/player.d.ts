export interface ISong {
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
  alia: Array<any>
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt: any
  cf: string
  al: {
    id: number
    name: string
    picUrl: string
    tns: Array<any>
    pic_str: string
    pic: number
  }
  dt: number
  h: {
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }
  m: {
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }
  l: {
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }
  sq: {
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }
  hr: any
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
  originSongSimpleData: any
  tagPicList: any
  resourceState: boolean
  version: number
  songJumpInfo: any
  entertainmentTags: any
  awardTags: any
  single: number
  noCopyrightRcmd: any
  rtype: number
  rurl: any
  mst: number
  cp: number
  mv: number
  publishTime: number
}

export interface IPrivileges {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
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
}

export interface ISongDetailResult {
  songs: Array<ISong>
  privileges: Array<IPrivileges>
  code: number
}

export interface ILyricResult {
  sgc: boolean
  sfy: boolean
  qfy: boolean
  lrc: {
    version: number
    lyric: string
  }
  klyric: {
    version: number
    lyric: string
  }
  tlyric: {
    version: number
    lyric: string
  }
  romalrc: {
    version: number
    lyric: string
  }
  code: number
}

export interface ILyricParse {
  time: number
  text: string
}
