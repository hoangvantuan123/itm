// permissions.js

const findMenuByKey = (permissions, menuKey) => {
  return permissions.find((menu) => menu.key_name === menuKey) || null
}

export const checkMenuPermission = (permissions, menuKey, action = 'view') => {
  // Tìm menu dựa trên menuKey
  const menu = findMenuByKey(permissions, menuKey)

  if (!menu) return false

  const permissionKey = `pm_${action}`
  return menu[permissionKey] ?? false
}

export const checkActionPermission = (permissions, menuKey, actionKey) => {
  return checkMenuPermission(permissions, menuKey, actionKey)
}

/* {checkActionPermission(permissions, 'settings', 'edit', 'users') && (
    <button className="action-button">Edit Users</button>
  )}
   */
