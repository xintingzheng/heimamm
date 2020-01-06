// 定义 key
const key = 'heimammtoken'

// 保存token
export function saveToken(token) {
    // 保存数据 外部传入token值
    window.localStorage.setItem(key, token);
}

// 获取token
export function getToken() {
    // 读取并返回保存的 token值
    return window.localStorage.getItem(key);
}

// 删除token
export function removeToken() {
    // 读取并返回保存的 token值
    window.localStorage.removeItem(key);
}

