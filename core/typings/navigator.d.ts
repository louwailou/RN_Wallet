import ScreenComponent from './screenComponent.d'

export interface Navigator{
    new(instance:ScreenComponent);
}