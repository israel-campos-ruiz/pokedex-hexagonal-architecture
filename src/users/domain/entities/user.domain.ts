export class UserDomain {
  name: string;
  email: string;
  password?: string;
  userId?: string;
  pokemon?: Array<any>;
  _id?: any;
  otp?: any;
  otpExpiresAt?: Date;
  constructor(data: {
    _id?: any;
    otp?: any;
    name: string;
    email: string;
    password?: string;
    userId?: string;
    pokemon?: Array<any>;
    otpExpiresAt?: Date;
  }) {
    this._id = data?._id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.userId = data.userId;
    this.pokemon = data.pokemon;
    this.otp = data.otp;
    this.otpExpiresAt = data.otpExpiresAt;
  }

  public setOtp(otp: string, expiresAt: Date) {
    this.otp = otp;
    this.otpExpiresAt = expiresAt;
  }

  public isOtpValid(otpToValidate: string): boolean {
    if (this.otpExpiresAt < new Date()) {
      return null;
    }

    return this.otp === otpToValidate.toString();
  }

  /**
   * method to compare passwords.
   * @param plainPassword plain password.
   * @param compareFunction callback to handle the logic on another layer.
   * @returns  Boolean to confirm both passwords are the same
   */
  public isPasswordValid(
    plainPassword: string,
    compareFunction: (plain: string, hashed: string) => boolean,
  ): boolean {
    if (!this.password) {
      throw new Error('Password hash not set');
    }
    return compareFunction(plainPassword, this.password);
  }
}
