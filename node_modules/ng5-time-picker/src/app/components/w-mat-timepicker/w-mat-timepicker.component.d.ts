import { EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ITime } from '../w-clock/w-clock.component';
export declare class WMatTimePickerComponent implements OnInit {
    private dialog;
    userTime: ITime;
    userTimeChange: EventEmitter<ITime>;
    color: string;
    constructor(dialog: MatDialog);
    ngOnInit(): void;
    private readonly time;
    showPicker($event: any): boolean;
    private emituserTimeChange();
}
