export class Lening {
  $key?: string;
  hardware?: string;
  huidige_blok?: string;
  nieuw_blok?: string;
  referentienummer?: string;
  gebruikersId?: string;
  status?: string;

  constructor(leningData) {
    this.hardware    = leningData.hardware;
    this.huidige_blok = leningData.huidige_blok;
    this.nieuw_blok = leningData.nieuw_blok;
    this.referentienummer = leningData.referentienummer;
    this.gebruikersId = leningData.gebruikersId;
    this.status = leningData.status;
  }
}
