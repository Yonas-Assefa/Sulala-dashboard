interface Document {
    getElementById<T extends CustomElement>(elementId: string): T | null;
}