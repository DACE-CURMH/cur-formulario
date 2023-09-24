export class Tools {
    protected titlecase(text?: string | null | undefined): string {
        if (text) {
            let split: string[];
            let result: string[] = [];

            split = text.split(' ');
            split.forEach(e => {
                if (e.length > 0) {
                    result.push(e[0].toUpperCase() + e.slice(1).toLocaleLowerCase())
                }
            });
            
            return result.join(' ');
        }

        return '';
    }

    protected phoneFormatter(number?: string): string {
        if(number && number.length > 0){
            let c = number.trim().slice(0,4);
            let n = number.trim().slice(4);

            return `(${c})-${n}`;
        }
        
        return '';
    }
}