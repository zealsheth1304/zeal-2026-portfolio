import React from 'react';
import { cn } from "@/lib/utils";

interface MetaItemProps {
    label: string;
    value: string;
}

const MetaItem = ({ label, value }: MetaItemProps) => (
    <div className="flex flex-col gap-1">
        <span className="text-ds-c2 uppercase tracking-widest font-bold text-muted/80">
            {label}
        </span>
        <span className="text-ds-c1 font-medium text-main leading-snug">
            {value}
        </span>
    </div>
);

interface ProjectMetaProps {
    role: string;
    duration: string;
    tools: string;
    team: string;
    className?: string;
}

export function ProjectMeta({ role, duration, tools, team, className }: ProjectMetaProps) {
    return (
        <div className={cn(
            "w-full py-10 my-16 border-y border-border-strong/50",
            "grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10",
            className
        )}>
            <MetaItem label="Role" value={role} />
            <MetaItem label="Duration" value={duration} />
            <MetaItem label="Tools" value={tools} />
            <MetaItem label="Team" value={team} />
        </div>
    );
}
