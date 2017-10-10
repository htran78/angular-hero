import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './hero.service';

import { Hero } from './hero';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'hero-detail',
    template: `
    <div *ngIf="hero">
        <h2>{{hero.name}} detail!</h2>
        <div>
            <label>Id: </label>{{hero.id}}
        </div>
        <div>
            <label>Name: </label>
            <input  [(ngModel)]="hero.name" placeholder="your name" />
        </div>
        <button (click)="goBack()">Back</button>
    </div>
    `,
    providers: [HeroService]
})

export class HeroDetailComponent implements OnInit{
    
    @Input() hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void{
        this.route.paramMap
            .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
            .subscribe(hero => this.hero = hero);
        console.log('>', this.hero);
        
    }

    goBack(): void {
        this.location.back();
    }
}