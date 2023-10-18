import { IApiTransformer } from '../../../Api/Transformers/IApiTransformer';
import { ClassValidator } from '../../../Api/Validation/ClassValidator';
import { LeaderboardRequest } from '../Request/LeaderboardRequest';
import { LeaderboardDto } from '../Dto/LeaderboardDto';
import { LeaderboardResponse } from '../Response/LeaderboardResponse';

export class LeaderboardTransformer implements IApiTransformer<LeaderboardDto, LeaderboardResponse> {
  public async fromApi(object: any, headers?: any): Promise<LeaderboardDto> {
    const requestObject = await ClassValidator.transformerToModel(LeaderboardRequest, object);

    await ClassValidator.validateInput(requestObject);

    return {
      currentUserRank: {
        token: requestObject.tokenbn,
      },
    };
  }

  public async toApi(dto: LeaderboardDto): Promise<LeaderboardResponse> {
    return {
      data: {
        mine: {
          myRank: dto.currentUserRank.myRank,
          userName: dto.currentUserRank.userName,
          score: dto.currentUserRank.score.toString(),
        },
        rank: dto.rank.map((item) => {
          return {
            userName: item.userName,
            score: item.score.toString(),
          };
        }),
      },
    };
  }
}
