

export interface StatusBar {
    isHidden: boolean//是否隐藏
    isHideWithNavBar: boolean//是否根据导航栏一块隐藏
    isBlur: boolean //是否显示毛玻璃的状态栏
    isLightStyle: boolean //不设置默认根据导航栏的isBlackBarStyle自动适配，一般不需要设置
}

export interface TabBarStyle {
    isHidden: boolean//是否隐藏, 默认true
    isDrawUnder: boolean//是否内容透过tabBar
}

export interface TabBar {
    badge: number
    style?: TabBarStyle
}

export interface NavigationBarStyle extends TabBarStyle{
    isBlur: boolean //是否添加毛玻璃效果（非系统默认导航栏样式下使用）仅IOS
    isTransparent: boolean//是否透明 默认false
    isTranslucent: boolean //是否不透明 默认true 仅IOS
    isHiddenBottomBorder: boolean //是否隐藏导航栏底线 默认false
    // isHidden: boolean //是否隐藏 默认false
    isHideOnScroll: boolean //是否在滑动时隐藏导航栏 默认false
    isHideWhenVerticallyCompact: boolean //滑动时改变导航栏透明度
    // isDrawUnder: boolean //是否内容透过navBar 默认false
    isDisableBackButton: boolean //是否禁用返回按钮 默认false
    isDisablePagePanGesture: boolean //是否禁用手势返回 默认false
    isDarkBarStyle: boolean //是否使用黑色导航栏风格 默认false
    opacity: number //不透明度 默认 1
    backgroundColor?: string //导航栏背景色 默认系统风格
    titleColor?: string // 标题颜色 默认根据barStyle 分为黑白
    buttonColor?: string // 导航栏按钮颜色
}

export interface NavigationBarTitle {
    title: string//主标题
    subTitle: string//副标题
    titleType: BarModel.TitleType // loading 或者 double 默认 default
}

export interface NavigationBarButtonItem {
    id: string //唯一标示 用于监听点击事件,可省略
    title?: string //标题
    icon?: string //图标
    onPress?: (screenInstance: object, id: string) => void
    disabled: boolean//是否禁用
    enableIconTint: boolean //是否启用icon的tinColor 默认false 仅IOS(配合icon使用)
}

export interface NavigationBar {
    leftButtons?: NavigationBarButtonItem[]
    rightButtons?: NavigationBarButtonItem[]
    title?: NavigationBarTitle
    style?: NavigationBarStyle
}


declare namespace ScreenBar {

    function statusBarCreator(statusBar?: StatusBar): StatusBar;

    function tabBarCreator(tabBar?: TabBar): TabBar;
    
    function navigationBarCreator(navigationBar?: NavigationBar): NavigationBar;

    enum TitleType {
        DEFAULT,
        DOUBLE,
        LOADING
    }
}

export default ScreenBar;