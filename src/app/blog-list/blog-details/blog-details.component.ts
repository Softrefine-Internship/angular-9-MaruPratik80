import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  blog!: any;

  ngOnInit(): void {
    this.blog = {
      user_id: 19,
      title: 'Defense the travel.',

      photo_url: 'https://api.slingacademy.com/public/sample-blog-posts/1.png',
      created_at: '2023-03-16T19:06:12.184269',
      id: 1,
      description: 'Role set leader structure.',
      content_html:
        '\u003Cp\u003EMoney form live strategy consider finally. Must time lose trade force will usually. Night bar deep method left.\u003C/p\u003E\u003Ch2\u003EWear travel manager radio serious hear catch green\u003C/h2\u003E\u003Cp\u003EHouse since there policy nothing book scene authority. Out notice even finish middle I. House since there policy nothing book scene authority. Out notice even finish middle I. House since there policy nothing book scene authority. Out notice even finish middle I.\u003C/p\u003E\u003Cp\u003EProvide soon particularly scene course. Customer few your. Ability question through kind guess. Provide soon particularly scene course. Customer few your. Ability question through kind guess. Provide soon particularly scene course. Customer few your. Ability question through kind guess.\u003C/p\u003E\u003Cp\u003EExplain condition base much drive. Page visit hour home meeting western Mrs. Explain condition base much drive. Page visit hour home meeting western Mrs. Explain condition base much drive. Page visit hour home meeting western Mrs.\u003C/p\u003E\u003Cp\u003EEvery age imagine almost figure four. Way sea serious old indeed happen thank.\u003C/p\u003E\u003Ch2\u003EOnce late it own those\u003C/h2\u003E\u003Cp\u003ETalk offer both fall support plan. Talk offer both fall support plan. Talk offer both fall support plan.\u003C/p\u003E\u003Cp\u003EIn who chair second base fund. In who chair second base fund. In who chair second base fund.\u003C/p\u003E\u003Cp\u003EModern several term. Can fact pull agent gas. Modern several term. Can fact pull agent gas. Modern several term. Can fact pull agent gas.\u003C/p\u003E\u003Cp\u003EFall thought former spend education. Start issue church quite.\u003C/p\u003E\u003Ch2\u003EMust no company difficult keep talk world least\u003C/h2\u003E\u003Cp\u003EWar stop gas test make. Wish stop yeah away result to. War stop gas test make. Wish stop yeah away result to. War stop gas test make. Wish stop yeah away result to.\u003C/p\u003E\u003Cp\u003ERich above may animal mean five feel. Modern parent entire peace her. To body history citizen rich Democrat. Rich above may animal mean five feel. Modern parent entire peace her. To body history citizen rich Democrat. Rich above may animal mean five feel. Modern parent entire peace her. To body history citizen rich Democrat.\u003C/p\u003E\u003Cp\u003EEducation final green opportunity. Begin doctor possible modern. Education final green opportunity. Begin doctor possible modern. Education final green opportunity. Begin doctor possible modern.\u003C/p\u003E\u003Cp\u003EPass lot notice would physical. Rate beyond hospital know sing decision over situation.\u003C/p\u003E\u003Ch2\u003EChance possible face certain\u003C/h2\u003E\u003Cp\u003EOthers hand different health discuss store. Who movement red then tell. Both of represent least beat audience. Others hand different health discuss store. Who movement red then tell. Both of represent least beat audience. Others hand different health discuss store. Who movement red then tell. Both of represent least beat audience.\u003C/p\u003E\u003Cp\u003ECouple it city that important bag. Last box land identify case skin while again. Take during water whatever best hospital be. Couple it city that important bag. Last box land identify case skin while again. Take during water whatever best hospital be. Couple it city that important bag. Last box land identify case skin while again. Take during water whatever best hospital be.\u003C/p\u003E\u003Cp\u003EAlong must animal positive soldier. Someone member answer specific weight customer movement. Along must animal positive soldier. Someone member answer specific weight customer movement. Along must animal positive soldier. Someone member answer specific weight customer movement.\u003C/p\u003E\u003Cp\u003EThrough above all simple only nor Mr. Response international report address Democrat alone. No cold eye travel sing.\u003C/p\u003E\u003Ch2\u003ECertainly recognize yourself soon mind\u003C/h2\u003E\u003Cp\u003EPlayer wide make federal. Lawyer task reach ten knowledge real important. Hot high TV. Player wide make federal. Lawyer task reach ten knowledge real important. Hot high TV. Player wide make federal. Lawyer task reach ten knowledge real important. Hot high TV.\u003C/p\u003E\u003Cp\u003EPublic husband gas leader. Public husband gas leader. Public husband gas leader.\u003C/p\u003E',
      category: 'love',
      updated_at: '2023-03-16T19:06:12.184272',
    };
  }
}
