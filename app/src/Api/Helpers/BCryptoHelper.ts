import bcrypt from 'bcrypt';

export default class BCryptoHelper {
  protected static rounds = 8;

  public static async generateHash(value: string): Promise<string> {
    if (!value || value.length <= 0) {
      throw new Error('Value is required');
    }

    const salt = await bcrypt.genSalt(this.rounds);
    return await bcrypt.hash(value, salt);
  }

  public static async compareValueWithHash(value: string, hash: string): Promise<boolean> {
    if (!value || value.length <= 0) {
      throw new Error('Value is required');
    }
    if (!hash || hash.length <= 0) {
      throw new Error('Hash is required');
    }
    return await bcrypt.compare(value, hash);
  }
}
