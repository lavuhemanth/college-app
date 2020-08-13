import { trigger, transition, style, animate, animation, useAnimation, state } from '@angular/animations';


export let fadeInAnimation = animation([
    style({ opacity: 0 }),
    animate('{{ duration }} {{ easing }}')
],{
    params: {
        duration: '200ms',
        easing: 'ease-out'
    }
});

export let fadeOutAnimation = animation([
    animate('{{ duration }} {{ easing }}', style({ opacity: 0 }))
],{
    params: {
        duration: '200ms',
        easing: 'ease-in'
    }
});

export let fade = trigger('fade', [
    transition(':enter', useAnimation(fadeInAnimation)),
    transition(':leave', useAnimation(fadeOutAnimation))
]);

export let expandCollapse = trigger('expandCollapse', [

    state('collapsed', style({ opacity: 0, height: 0, overflow: 'hidden' })),
    state('expanded', style({ opacity: 1, height: '*' })),

    transition('collapsed => expanded', animate('200ms ease-out')),
    transition('expanded => collapsed', animate('200ms ease-in'))

]);