/**
 * 获取用户跳转信息
 * @param type 用户类型
 * @param avatar 用户头像
 */


export function getRedirectPath({ type, avatar }: { type: string, avatar?: string }) {
    // 根据用户信息, 返回跳转地址
    // user.type /boss /genius
    // user.avatar /bossInfo /geniusInfo
    let url = (type.toString() === 'boss') ? '/boss' : '/genius';
    if (!avatar) {
        url += 'Info'
    }
    return url;
}

/**
 * 获取聊天信息的id
 * @param userId 用户id
 * @param targetId 目标用户id
 */
export function getChatId(userId: string, targetId: string) {
    return [userId, targetId].sort().join('_');
}