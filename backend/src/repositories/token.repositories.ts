import { DeleteResult } from "mongoose";

import { IToken, ITokenModel } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepositories {
    public upsertByUserId(dto: ITokenModel): Promise<IToken> {
        return Token.findOneAndUpdate(
            { _userId: dto._userId },
            { $set: { ...dto } },
            { new: true, upsert: true },
        );
    }

    public delete(userId: string): Promise<DeleteResult> {
        return Token.deleteOne({ _userId: userId });
    }

    public findByParams(params: Partial<IToken>): Promise<IToken> {
        return Token.findOne(params);
    }
}

export const tokenRepositories = new TokenRepositories();
