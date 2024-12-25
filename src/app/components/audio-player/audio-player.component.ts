import { Component, Input, OnInit } from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-audio-player',
  template: `
    <div class="audio-player">
      <button (click)="togglePlay()">{{ isPlaying ? '暂停' : '播放' }}</button>
      <input type="range" [value]="progress" (input)="seek($event)">
      <span>{{ currentTime | time }} / {{ duration | time }}</span>
    </div>
  `
})
export class AudioPlayerComponent implements OnInit {
  @Input() audioUrl: string;
  
  private howl: Howl;
  isPlaying = false;
  progress = 0;
  currentTime = 0;
  duration = 0;

  ngOnInit() {
    this.initAudio();
  }

  initAudio() {
    this.howl = new Howl({
      src: [this.audioUrl],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.updateProgress();
      },
      onpause: () => {
        this.isPlaying = false;
      },
      onload: () => {
        this.duration = this.howl.duration();
      }
    });
  }

  togglePlay() {
    if (this.howl.playing()) {
      this.howl.pause();
    } else {
      this.howl.play();
    }
  }

  seek(event: any) {
    const time = (event.target.value / 100) * this.duration;
    this.howl.seek(time);
  }

  private updateProgress() {
    if (this.isPlaying) {
      requestAnimationFrame(() => this.updateProgress());
      this.currentTime = this.howl.seek();
      this.progress = (this.currentTime / this.duration) * 100;
    }
  }
} 