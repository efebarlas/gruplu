import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { tap, map, filter, throttleTime, switchMap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-location',
  templateUrl: './display-location.component.html',
  styleUrls: ['./display-location.component.scss']
})
export class DisplayLocationComponent implements OnInit {
  @Input() user: Observable<any>;
  isUs: boolean = false;
  location$: Observable<string>;
  noLocation: boolean = true;
  constructor(private userSvc: UserService) { }
  cityList = {
    'a':{
      'd':{
        'a':'na',
        'ı':'yaman'
      },
      'f':'yonkarahisar',
      'ğ':'rı',
      'k':'saray',
      'm':'asya',
      'n':{
        'k':'ara',
        't':'alya'
      },
      'r':{
        'd':'ahan',
        't':'vin'
      },
      'y':'dın'
    },
    'b':{
      'a':{
        'l':'ıkesir',
        'r':'tın',
        't':'man',
        'y':'burt'
      },
      'i':{
        'l':'ecik',
        'n':'göl',
        't':'lis'
      },
      'o':'lu',
      'ur':{
        'd':'ur',
        's':'a'
      }
    },
    'ç':{
      'an':{
        'a':'kkale',
        'k':'ırı'
      },
      'o':'rum'
    },
    'd':{
      'e':'nizli',
      'i':'yarbakır',
      'ü':'zce'
    },
    'e':{
      'd':'irne',
      'l':'azığ',
      'rz':{
        'i':'ncan',
        'u':'rum'
      },
      's':'kişehir'
    },
    'g':{
      'a':'ziantep',
      'i':'resun',
      'ü':'müşhane'
    },
    'ha':{
      'k':'kari',
      't':'ay'
    },
    'ı':{
      'ğ':'dır',
      's':'parta'
    },
    'i':{
      's':'tanbul',
      'z':'mir'
    },
    'k':{
      'a':{
        'h':'göl',
        'r':{
          'a':{
            'b':'ük',
            'm':'an'
          },
          's':'',
        },
        's':'tamonu',
        'y':'seri'
      },
      'ır':{
        'ı':'kkale',
        'k':'lareli',
        'ş':'ehir'
      },
      'i':'lis',
      'o':{
        'c':'aeli',
        'n':'ya'
      },
      'ü':'tahya'
    },
    'm':{
      'a':{
        'l':'atya',
        'n':'isa',
        'r':'din'
      },
      'e':'rsin',
      'u':{
        'ğ':'la',
        'ş':''
      }
    },
    'n':{
      'e':'vşehir',
      'i':'ğde'
    },
    'o':{
      'r':'du',
      's':'maniye'
    },
    'r':'ize',
    's': {
      'a':{
        'k':'arya',
        'm':'sun'
      },
      'i': {
        'i':'rt',
        'n':'op',
        'v':'as'
      }
    },
    'ş':{
      'a':'nlıurfa',
      'ı':'rnak'
    },
    't':{
      'e':'kirdağ',
      'o':'kat',
      'r':'abzon',
      'u':'nceli'
    },
    'u':'şak',
    'v':'an',
    'y':{
      'a':'lova',
      'o':'zgat'
    },
    'z':'onguldak'
  };
  city = new FormControl('', Validators.required);

  setLocation() {
    this.userSvc.setLocation(this.city.value);
  }

  ngOnInit(): void {
    this.location$ = this.user.pipe(
      tap(user => {
        this.isUs = this.userSvc.userId == user.id;
      }),
      map(user => user.data.city),
      filter(location => location),
      tap(() => {
        this.noLocation = false;
      })
    );
  }

}
