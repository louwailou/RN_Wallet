
function statusBarCreator(statusBar = {}) {
    return Object.assign({
        isHidden: false,//是否隐藏
        isHideWithNavBar: false,//是否根据导航栏一块隐藏
        isBlur: false,//是否显示毛玻璃的状态栏
        isLightStyle: false//不设置默认根据导航栏的isBlackBarStyle自动适配，一般不需要设置
    }, statusBar);
}

function tabBarStyleCreator(tabBarStyle = {}) {
    return Object.assign({
        isHidden: false,//是否隐藏
        isDrawUnder: false//是否内容透过tabBar
    }, tabBarStyle)
}

function tabBarCreator(tabBar = {}) {
    return Object.assign({
        badge: 0,
        style: tabBarStyleCreator(tabBar.style)
    }, tabBar);
}

function navigationBarTitleCreator(navBarTitle = {}) {
    return Object.assign({
        title: '',//主标题
        subTitle: '',//副标题
        titleType: 0 // loading 2 或者 double 1 默认 default 0
    }, tabBar);
}

function navigationBarButtonItemCreator(navBarButtonItem = {}) {
    return Object.assign({
        id: '',//唯一标示 用于监听点击事件,可省略
        title: '',//标题
        icon: '',//图标
        onPress: null,
        disabled: false,
        enableIconTint: false
    }, navBarButtonItem);
}

function navigationBarStyleCreator(navBarStyle = {}) {
    return Object.assign({
        isBlur: false,//是否添加毛玻璃效果（非系统默认导航栏样式下使用）仅IOS
        isTransparent: false,//是否透明 默认false
        isTranslucent: true, //是否不透明 默认true 仅IOS
        isHiddenBottomBorder: false,//是否隐藏导航栏底线 默认false
        isHidden: false,//是否隐藏 默认false
        isHideOnScroll: false,//是否在滑动时隐藏导航栏 默认false
        isHideWhenVerticallyCompact: false, //滑动时改变导航栏透明度
        isDrawUnder: false,//是否内容透过navBar 默认false
        isDisableBackButton: false,//是否禁用返回按钮 默认false
        isDisablePagePanGesture: false,//是否禁用手势返回 默认false
        isDarkBarStyle: false,//是否使用黑色导航栏风格 默认false
        opacity: 1,//不透明度 默认 1
        backgroundColor: null, //导航栏背景色 默认系统风格
        titleColor: null,// 标题颜色 默认根据barStyle 分为黑白
        buttonColor: null, // 导航栏按钮颜色
    }, navBarStyle);
}

function navigationBarCreator(navBar = {}) {
    return Object.assign({
        leftButtons: null,
        rightButtons: null,
        title: navigationBarTitleCreator(navBar.title),
        style: navigationBarStyleCreator(navBar.style)
    }, navBar);
}
// CommondJS 的写法 进行的是值得copy ,ES6 才是值得引用
module.exports = {
    statusBarCreator,
    tabBarCreator,
    navigationBarCreator,
    TitleType: {
        DEFAULT: 0,
        DOUBLE: 1,
        LOADING: 2
    }
}