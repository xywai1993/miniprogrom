import { httpRequest as d } from '../utils/dorequest.js';

export function checkToken() {
    return d({
        method: 'get',
        url: '/api/users/check-token',
    });
}

export function Login(code, type = 'mini_program') {
    return d.post('/api/users/login', { code, type });
}

export function GetQiNiuToken() {
    return d.get('/api/qiniu/token');
}

export function UpdateUserInfo(data) {
    return d.post('/api/users/self/update_info', data);
}

export function GetUserInfo() {
    return d.get('/api/users/self/info');
}

export function GetMaterials(category_id = '', title = '', page = 1, page_size = 20) {
    return d.get('/api/materials', { title, category_id, page, page_size });
}

export function GetSortList() {
    return d.get('/api/material_categories');
}

export function GetCollection() {
    return d.get('/api/users/self/follow');
}

export function GetLike() {
    return d.get('/api/users/self/like');
}

export function GetMaterialsDetails(material_id) {
    return d.get('/api/materials/show', { material_id });
}

export function ToggleLike(material_id) {
    return d.get('/api/materials/toggle_like', { material_id });
}

export function ToggleFollow(material_id) {
    return d.get('/api/materials/toggle_follow', { material_id });
}

export function ChangeComplete(item_id) {
    return d.get('/api/bar/toggle_complete', { item_id });
}

export function GetBanner(type = 'banner') {
    return d.get('/api/ads', { type });
}

export function GetItem(item_id) {
    return d.get('/api/list_items/show', { item_id });
}

export function GetPosterData(material_id, page, scene) {
    return d.get('/api/lists/poster', { material_id, page, scene });
}
